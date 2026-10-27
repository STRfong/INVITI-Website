#!/usr/bin/env bash
# 映像煙霧測試：起一個容器，確認首頁、前端路由、assets 快取標頭與 404 都符合 nginx/default.conf 的預期。
# CI 的 build job 在推到 GHCR 前執行；本機：deploy/linode/tests/smoke_image.sh <映像>
set -euo pipefail

IMAGE=${1:?用法：$0 <映像>}
PORT=${SMOKE_PORT:-18080}
BASE="http://127.0.0.1:$PORT"
NAME=inviti-website-smoke-$$

fail() { echo "FAIL - $1" >&2; exit 1; }

docker run -d --rm --name "$NAME" -p "127.0.0.1:$PORT:8080" "$IMAGE" >/dev/null
trap 'docker rm -f "$NAME" >/dev/null 2>&1 || true' EXIT

for _ in $(seq 1 20); do
  curl -fsS -o /dev/null "$BASE/" 2>/dev/null && break
  sleep 0.5
done

index=$(curl -fsS "$BASE/") || fail "首頁沒有回 200"
grep -q '<div id="root">' <<< "$index" || fail "首頁不是 index.html"
grep -qi '^cache-control: no-cache' <(curl -fsSI "$BASE/") || fail "index.html 應該是 no-cache"
echo "ok   - 首頁"

curl -fsS "$BASE/blog" | grep -q '<div id="root">' || fail "/blog 沒有回 index.html（SPA fallback）"
curl -fsS "$BASE/features/whatever" | grep -q '<div id="root">' || fail "/features/... 沒有回 index.html"
echo "ok   - 前端路由回 index.html"

asset=$(grep -oE '/assets/index-[^"]+\.js' <<< "$index" | head -n 1)
[[ -n $asset ]] || fail "index.html 裡找不到 /assets/index-*.js"
headers=$(curl -fsSI -H 'Accept-Encoding: gzip' "$BASE$asset") || fail "$asset 沒有回 200"
grep -qi '^cache-control: public, max-age=31536000, immutable' <<< "$headers" || fail "$asset 沒有長期快取標頭"
grep -qi '^content-type: application/javascript' <<< "$headers" || fail "$asset 的 Content-Type 不對"
grep -qi '^content-encoding: gzip' <<< "$headers" || fail "$asset 沒有 gzip"
echo "ok   - assets 長期快取、gzip"

code=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/assets/does-not-exist.js")
[[ $code == 404 ]] || fail "不存在的 asset 應該回 404，實際 $code"
echo "ok   - 不存在的 asset 回 404"

# compose healthcheck 與 deploy.sh 都用容器內的 wget
docker exec "$NAME" wget -q -O /dev/null http://127.0.0.1:8080/blog || fail "容器內 wget 健康檢查失敗"
echo "ok   - 容器內 wget 健康檢查"

echo "全部通過"
