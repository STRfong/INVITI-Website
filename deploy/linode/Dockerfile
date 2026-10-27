# syntax=docker/dockerfile:1
#
# INVITI 官網自架部署用映像（Linode，見 deploy/linode/README.md）
# 建置方式與根目錄 Zeabur 用的 Dockerfile 相同（node:22-alpine + npm ci + vite build），
# 差別只在改用 nginx 提供 dist/，設定在 deploy/linode/nginx/default.conf（SPA fallback、快取標頭）
#
# 刻意不放在 repo 根目錄：根目錄的 Dockerfile 是 Zeabur 正式站在用的，搬遷完成前不能動。
# build context 是 repo 根目錄，排除清單在同目錄的 Dockerfile.dockerignore（BuildKit 優先讀它）：
#   docker build --platform linux/amd64 -f deploy/linode/Dockerfile .

# ─────────── Stage 1: build ───────────
FROM node:22-alpine AS build

WORKDIR /src

# 先 copy lockfile，讓相依套件層獨立快取
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build


# ─────────── Stage 2: runtime ───────────
# 與 VIPSystem、tool-web 的 nginx 同版
FROM nginx:1.30-alpine

COPY deploy/linode/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html

EXPOSE 8080
