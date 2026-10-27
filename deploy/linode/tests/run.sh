#!/usr/bin/env bash
# 在 Debian 容器裡跑 deploy.sh 的測試（需要 GNU sed、flock，Mac 內建的不行）
set -euo pipefail
cd "$(dirname "$0")/.."
docker run --rm -v "$PWD:/deploy:ro" debian:bookworm-slim bash /deploy/tests/test_deploy.sh
