#!/usr/bin/env bash
# 部署指定 commit 的映像到這台主機：拉映像 → 換 tag → 重建 web → 健康檢查，失敗自動退回上一版。
# 由 VIPSystem 的 deploy.sh 簡化而來：純靜態網站，沒有資料庫備份、worker 與前置 nginx。
# 安裝在 /opt/inviti-website/deploy.sh（root:root 700），由 GitHub Actions 經 deploy 使用者的
# SSH forced command + sudo 呼叫，也可以用 root 手動執行：/opt/inviti-website/deploy.sh <40 碼 commit SHA>
#
# 退出碼：0 成功；1 新版啟動或健康檢查失敗（已嘗試退回上一版）；2 參數錯誤；3 另一次部署進行中；4 拉映像失敗
set -euo pipefail

# ---- 每個專案要改的只有這一區 ----
# DEPLOY_* 環境變數只給測試用；經 sudo 呼叫時環境變數會被清掉，不會被外部覆寫
PROJECT_DIR=${DEPLOY_PROJECT_DIR:-/opt/inviti-website}
LOCK_FILE=${DEPLOY_LOCK_FILE:-/run/lock/inviti-website-deploy.lock}
IMAGE=ghcr.io/strfong/inviti-website
SERVICE=web
APP_PORT=8080
TAG_VAR=INVITI_WEBSITE_IMAGE_TAG     # .env 裡記錄目前版本的變數
HEALTH_PATHS=(/ /blog)               # 首頁 + 一條前端路由（確認 SPA fallback 正常）
HEALTH_TRIES=${DEPLOY_HEALTH_TRIES:-10}
HEALTH_INTERVAL=${DEPLOY_HEALTH_INTERVAL:-2}
KEEP_IMAGES=5
# ----------------------------------

log() { echo "$(date -u +%Y-%m-%dT%H:%M:%SZ) $*"; }

if [[ $# -ne 1 || ! $1 =~ ^[0-9a-f]{40}$ ]]; then
  echo "用法：$0 <40 碼小寫 commit SHA>" >&2
  exit 2
fi
NEW_TAG=$1

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  log "另一次部署正在進行，這次不執行"
  exit 3
fi

cd "$PROJECT_DIR"

current_tag() { sed -n "s/^${TAG_VAR}=//p" .env | tail -n 1; }

set_tag() {
  if grep -q "^${TAG_VAR}=" .env; then
    sed -i "s/^${TAG_VAR}=.*/${TAG_VAR}=$1/" .env
  else
    echo "${TAG_VAR}=$1" >> .env
  fi
}

# 在新容器裡用 busybox wget 打自己（nginx:alpine 沒有 curl），非 2xx 時 wget 會回非 0
path_ok() {
  docker compose exec -T "$SERVICE" wget -q -O /dev/null "http://127.0.0.1:$APP_PORT$1" >/dev/null 2>&1
}

# Caddy 每次連線都重新解析 inviti-website-web，容器重建後不需要 reload
healthy() {
  local i path
  for ((i = 1; i <= HEALTH_TRIES; i++)); do
    for path in "${HEALTH_PATHS[@]}"; do
      path_ok "$path" || { sleep "$HEALTH_INTERVAL"; continue 2; }
    done
    log "${HEALTH_PATHS[*]} 都回應 2xx（等了約 $(((i - 1) * HEALTH_INTERVAL)) 秒）"
    return 0
  done
  log "在 $HEALTH_TRIES 次檢查內 ${HEALTH_PATHS[*]} 沒有全部回應 2xx"
  return 1
}

prune_images() {
  local i=0 tag
  while read -r tag; do
    [[ $tag =~ ^[0-9a-f]{40}$ ]] || continue
    i=$((i + 1))
    ((i <= KEEP_IMAGES)) && continue
    [[ $tag == "$NEW_TAG" || $tag == "$OLD_TAG" ]] && continue
    docker image rm "$IMAGE:$tag" >/dev/null || log "刪除舊映像 $tag 失敗，略過"
  done < <(docker image ls "$IMAGE" --format '{{.Tag}}')
}

OLD_TAG=$(current_tag)
log "開始部署：${OLD_TAG:-（無）} → $NEW_TAG"

# 同一個 SHA tag 內容不會變，主機上已有就不 pull：GHCR 連不上或 PAT 過期時仍能退回舊版
if docker image inspect "$IMAGE:$NEW_TAG" >/dev/null 2>&1; then
  log "主機上已有 $NEW_TAG，不重新下載"
elif ! docker pull "$IMAGE:$NEW_TAG"; then
  # docker pull 失敗也是 exit 1，明確改成 4，才不會和「已退回上一版」混淆
  log "下載 $NEW_TAG 失敗，正式站沒有被動到"
  exit 4
fi

set_tag "$NEW_TAG"
if docker compose up -d "$SERVICE" && healthy; then
  prune_images
  log "部署完成：$NEW_TAG"
  exit 0
fi

if [[ -z $OLD_TAG ]]; then
  log "新版啟動或健康檢查失敗，而且沒有上一版可以退回，請手動處理"
  exit 1
fi

log "新版啟動或健康檢查失敗，退回上一版 $OLD_TAG"
set_tag "$OLD_TAG"
if docker compose up -d "$SERVICE" && healthy; then
  log "已退回 $OLD_TAG，正式站恢復"
else
  log "退回 $OLD_TAG 後健康檢查仍失敗，請立即手動處理"
fi
exit 1
