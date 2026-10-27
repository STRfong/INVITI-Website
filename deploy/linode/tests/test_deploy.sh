#!/usr/bin/env bash
# deploy.sh 的測試：用假的 docker 模擬主機，檢查每條分支的退出碼與副作用。
# 需要 GNU 工具（flock），在 Mac 上用 deploy/linode/tests/run.sh 放進 Debian 容器執行。
# 斷言寫成 cond && pass || fail（pass 不會失敗）；假腳本內容刻意用單引號不展開
# shellcheck disable=SC2015,SC2016
set -uo pipefail

HERE=$(cd "$(dirname "$0")" && pwd)
DEPLOY="$HERE/../deploy.sh"
OLD=1111111111111111111111111111111111111111
NEW=2222222222222222222222222222222222222222
# BAD：首頁回 500；NOSPA：首頁正常但前端路由 /blog 回 404（SPA fallback 壞掉）
BAD=badbadbadbadbadbadbadbadbadbadbadbadbad0
NOSPA=deaddeaddeaddeaddeaddeaddeaddeaddeaddead
IMAGE=ghcr.io/strfong/inviti-website
UP_WEB='compose up -d web'

failures=0
pass() { echo "ok   - $1"; }
fail() { echo "FAIL - $1"; failures=$((failures + 1)); }

# 每個案例一個乾淨的假主機目錄：.env、假 docker
setup() {
  T=$(mktemp -d)
  mkdir -p "$T/bin" "$T/project"
  printf "INVITI_WEBSITE_IMAGE_TAG=%s\n" "$OLD" > "$T/project/.env"
  : > "$T/calls"
  : > "$T/images"
  : > "$T/local"
  cat > "$T/bin/docker" <<'FAKE'
#!/usr/bin/env bash
# 假 docker：記錄呼叫；依 .env 目前的 tag 決定回應
#   bad 開頭的 tag：所有路徑都失敗；dead 開頭的 tag：只有 / 成功
# local 檔列出主機上已有的 tag；FAKE_UP_FAIL_COUNT 讓前幾次 compose up 失敗
echo "docker $*" >> "$FAKE_DIR/calls"
tag=$(sed -n 's/^INVITI_WEBSITE_IMAGE_TAG=//p' "$FAKE_DIR/project/.env")
case "$*" in
  pull*) exit "${FAKE_PULL_EXIT:-0}" ;;
  "image inspect"*) ref=${!#}; grep -qx "${ref##*:}" "$FAKE_DIR/local"; exit $? ;;
  "compose up"*)
    n=$(( $(cat "$FAKE_DIR/upcount" 2>/dev/null || echo 0) + 1 ))
    echo "$n" > "$FAKE_DIR/upcount"
    (( n > ${FAKE_UP_FAIL_COUNT:-0} )) || exit 1 ;;
  *"wget"*)
    [[ $tag == bad* ]] && exit 1
    [[ $tag == dead* && ${!#} != */ ]] && exit 1
    exit 0 ;;
  "image ls"*) cat "$FAKE_DIR/images" ;;
esac
exit 0
FAKE
  chmod +x "$T/bin/docker"
  export FAKE_DIR=$T PATH="$T/bin:$PATH"
  export DEPLOY_PROJECT_DIR="$T/project" DEPLOY_LOCK_FILE="$T/lock"
  export DEPLOY_HEALTH_TRIES=2 DEPLOY_HEALTH_INTERVAL=0
  unset FAKE_PULL_EXIT FAKE_UP_FAIL_COUNT
}

run() { OUT=$("$DEPLOY" "$@" 2>&1); CODE=$?; }
tag_now() { sed -n 's/^INVITI_WEBSITE_IMAGE_TAG=//p' "$T/project/.env"; }
docker_calls() { grep -c '^docker' "$T/calls" || true; }
up_web_count() { grep -cx "docker $UP_WEB" "$T/calls" || true; }

# --- 參數驗證：任何不合格的參數都 exit 2，且完全不碰 docker ---
for args in "" "ls" "$NEW x" "${NEW//2/A}" "${NEW:0:39}" "$NEW;ls"; do
  setup
  if [[ -z $args ]]; then run; else read -ra a <<< "$args"; run "${a[@]}"; fi
  [[ $CODE -eq 2 && $(docker_calls) -eq 0 && ! -s $T/calls ]] \
    && pass "拒絕參數 '${args}'" || fail "拒絕參數 '${args}'（exit $CODE）"
done

# --- 鎖：另一次部署進行中時 exit 3，不碰 docker ---
setup
exec 8>"$DEPLOY_LOCK_FILE"; flock 8
run "$NEW"
exec 8>&-
[[ $CODE -eq 3 && ! -s $T/calls ]] && pass "部署進行中時 exit 3" || fail "部署進行中時 exit 3（exit $CODE）"

# --- pull 失敗：.env 不變、不重啟 ---
setup
FAKE_PULL_EXIT=1 run "$NEW"
[[ $CODE -eq 4 && $(tag_now) == "$OLD" ]] && ! grep -q 'up -d' "$T/calls" \
  && pass "pull 失敗時不換版" || fail "pull 失敗時不換版（exit $CODE）"

# --- 成功：web 換到新 tag、印出新舊 tag ---
setup
run "$NEW"
grep -q "pull $IMAGE:$NEW" "$T/calls" \
  && [[ $(up_web_count) -eq 1 && $(grep -c 'compose up' "$T/calls") -eq 1 ]] \
  && [[ $CODE -eq 0 && $(tag_now) == "$NEW" && $OUT == *"$OLD"* && $OUT == *"$NEW"* ]] \
  && pass "成功部署：web 換到新 tag" || fail "成功部署：web 換到新 tag（exit $CODE）"
grep -q 'compose exec -T web wget .*http://127.0.0.1:8080/$' "$T/calls" \
  && grep -q 'compose exec -T web wget .*http://127.0.0.1:8080/blog$' "$T/calls" \
  && pass "健康檢查打首頁與前端路由" || fail "健康檢查打首頁與前端路由"
[[ $(wc -l < "$T/project/.env") -eq 1 ]] && pass "換版不會重複寫入變數" || fail "換版不會重複寫入變數"

# --- 首頁健康檢查失敗：寫回上一版並重啟，exit 1 ---
setup
run "$BAD"
[[ $CODE -eq 1 && $(tag_now) == "$OLD" && $(up_web_count) -eq 2 ]] \
  && pass "首頁健康檢查失敗時回滾上一版" || fail "首頁健康檢查失敗時回滾上一版（exit $CODE, tag $(tag_now)）"

# --- 前端路由失敗：同樣視為失敗並回滾 ---
setup
run "$NOSPA"
[[ $CODE -eq 1 && $(tag_now) == "$OLD" && $(up_web_count) -eq 2 ]] \
  && pass "前端路由失敗時回滾上一版" || fail "前端路由失敗時回滾上一版（exit $CODE, tag $(tag_now)）"

# --- 映像已在主機上：不 pull（GHCR 連不上也能退版）---
setup
echo "$NEW" > "$T/local"
FAKE_PULL_EXIT=1 run "$NEW"
[[ $CODE -eq 0 && $(tag_now) == "$NEW" ]] && ! grep -q '^docker pull' "$T/calls" \
  && pass "映像已在主機上時不 pull" || fail "映像已在主機上時不 pull（exit $CODE）"

# --- compose up 失敗：和健康檢查失敗一樣退回上一版 ---
setup
FAKE_UP_FAIL_COUNT=1 run "$NEW"
[[ $CODE -eq 1 && $(tag_now) == "$OLD" && $OUT == *"退回上一版"* ]] \
  && pass "啟動失敗時回滾上一版" || fail "啟動失敗時回滾上一版（exit $CODE, tag $(tag_now)）"

# --- 回滾時 compose up 也失敗：exit 1 並要求手動處理 ---
setup
FAKE_UP_FAIL_COUNT=2 run "$NEW"
[[ $CODE -eq 1 && $(tag_now) == "$OLD" && $OUT == *"請立即手動處理"* ]] \
  && pass "回滾也啟動失敗時提示手動處理" || fail "回滾也啟動失敗時提示手動處理（exit $CODE）"

# --- 第一次部署（.env 還沒有 tag）：補上變數 ---
setup
: > "$T/project/.env"
run "$NEW"
[[ $CODE -eq 0 && $(tag_now) == "$NEW" ]] && pass "沒有舊 tag 時補上變數" || fail "沒有舊 tag 時補上變數（exit $CODE）"

# --- 第一次部署就失敗：沒有上一版可退，exit 1 且留下訊息 ---
setup
: > "$T/project/.env"
run "$BAD"
[[ $CODE -eq 1 && $OUT == *"沒有上一版"* && $(up_web_count) -eq 1 ]] \
  && pass "沒有上一版時不嘗試回滾" || fail "沒有上一版時不嘗試回滾（exit $CODE）"

# --- 清理：只留最近 5 個 SHA tag，正在用的、上一版與非 SHA tag 一定保留 ---
setup
# image ls 由新到舊；OLD（上一版）排在最舊，NEW 是這次部署；sha-0165d14 代表手動推的非 SHA tag
{
  echo "$NEW"
  for i in 3 4 5 6 7; do printf '%040d\n' "$i"; done
  echo "$OLD"
  echo "main"
  echo "sha-0165d14"
} > "$T/images"
run "$NEW"
removed=$(grep -c 'image rm' "$T/calls" || true)
! grep -q "image rm .*:$NEW" "$T/calls" && ! grep -q "image rm .*:$OLD" "$T/calls" \
  && ! grep -q 'image rm .*:main' "$T/calls" && ! grep -q 'image rm .*:sha-' "$T/calls" \
  && grep -q "image rm $IMAGE:$(printf '%040d' 7)" "$T/calls" \
  && [[ $CODE -eq 0 && $removed -eq 1 ]] \
  && pass "清理舊映像只留 5 個" || fail "清理舊映像只留 5 個（刪了 $removed 個）"

echo
if [[ $failures -eq 0 ]]; then echo "全部通過"; else echo "$failures 個失敗"; exit 1; fi
