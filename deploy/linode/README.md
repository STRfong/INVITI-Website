# INVITI 官網自架部署（GitHub Actions → GHCR → Linode）

> ⚠️ **自動部署打開後（`DEPLOY_ENABLED=true`），push 到 `main` 等於上正式站**（合併 PR、把 upstream 合進來再 push 也是），約 3～5 分鐘後生效，換容器時正式站會中斷 1～2 秒。

主機 `172.104.120.210`（Ubuntu 24.04、x86_64）與 tool-web、VIPSystem 共用：整台只有一個 Caddy（`/opt/caddy`）對外開 80／443，各專案透過 Docker 網路 `proxy` 接上 Caddy。官網放在 `/opt/inviti-website`，compose 專案名稱 `inviti-website`。

這份文件中的指令都不含密碼，PAT、私鑰都不要貼進對話或 commit。

## 架構

```
訪客 → Cloudflare（Proxied）→ Caddy（/opt/caddy，自動 HTTPS，www → 根網域 301）
     → inviti-website-web（nginx :8080，提供 vite build 出來的 dist/）
```

純靜態網站：沒有資料庫、沒有 app.env、不需要備份（內容全部在 git 與映像裡）。

| 服務 | 映像 | mem_limit | 備註 |
| --- | --- | --- | --- |
| web | `ghcr.io/strfong/inviti-website:<SHA>` | 64m | nginx:1.30-alpine，只接 `proxy` 網路，alias `inviti-website-web` |

nginx 設定（`deploy/linode/nginx/default.conf`）建進映像裡，改設定就是改程式碼，走同一條 CI：

- 沒有對應檔案的路徑一律回 `index.html`（前端自己處理 `/blog`、`/help-center`、`/features/...`）。
- `/assets/` 檔名帶雜湊值，`Cache-Control: public, max-age=31536000, immutable`；找不到回 404，不回 index.html。
- 其他（含 index.html）`no-cache`，換版後訪客重新整理就拿到新版。

## CI／CD 流程

`.github/workflows/deploy.yml`：

1. **test**：`npm ci` + `npm run build`（專案沒有測試，至少確認建置過得了）。PR 到 `main` 只跑這一步。
2. **build**：用 `deploy/linode/Dockerfile` 建置 `linux/amd64` 映像，先在 runner 上跑 `deploy/linode/tests/smoke_image.sh`（首頁、前端路由、assets 快取標頭與 gzip、404、容器內 wget），通過才推到 private GHCR：`ghcr.io/strfong/inviti-website:<40 碼 commit SHA>` 與 `:main`。
3. **deploy**：repo variable `DEPLOY_ENABLED` 為 `true` 時，用受限的 SSH 金鑰連到主機執行 `deploy.sh <commit SHA>`。
4. **cleanup**：GHCR 只保留最近 20 個版本，失敗不影響部署。

在 Apple Silicon 上手動建置要加 `--platform linux/amd64`；本機驗證不需要（只是 nginx + 靜態檔）：

```bash
docker build -f deploy/linode/Dockerfile -t inviti-website:local .
deploy/linode/tests/smoke_image.sh inviti-website:local
```

Dockerfile 刻意放在 `deploy/linode/` 而不是 repo 根目錄：根目錄的 `Dockerfile` 是 Zeabur 正式站在用的（`zeabur/caddy-static`），搬遷完成、Zeabur 停用前不能動。排除清單是同目錄的 `Dockerfile.dockerignore`。

## deploy.sh

`/opt/inviti-website/deploy.sh <40 碼 SHA>`（原始檔是本目錄的 `deploy.sh`，由 VIPSystem 版本簡化：沒有備份、worker 與前置 nginx）：

1. 參數必須剛好是一個 40 碼小寫 SHA，否則 exit 2。
2. `flock` 鎖住 `/run/lock/inviti-website-deploy.lock`，另一次部署進行中時 exit 3。
3. 主機上還沒有這個 SHA 的映像才 `docker pull`，失敗 exit 4、`.env` 不變；已經有就跳過，GHCR 連不上時仍能退回主機上的舊版。
4. 把 `.env` 的 `INVITI_WEBSITE_IMAGE_TAG` 改成新 SHA，`docker compose up -d web`。
5. 健康檢查：在新容器裡用 wget 打 `/` 與 `/blog`（確認 SPA fallback），每 2 秒一次、最多 10 次。Caddy 每次連線都重新解析 `inviti-website-web`，不需要 reload。
6. 成功：主機上只保留最近 5 個 SHA 映像（正在用的和上一版一定保留）。
7. 失敗：寫回上一版 tag 並重啟。

| 退出碼 | 意思 |
| --- | --- |
| 0 | 部署成功 |
| 1 | 新版啟動或健康檢查失敗，已嘗試退回上一版（看 log 確認退回是否成功） |
| 2 | 參數錯誤 |
| 3 | 另一次部署正在進行 |
| 4 | 下載映像失敗，正式站沒有被動到 |

測試：`deploy/linode/tests/run.sh`（在 Debian 容器裡用假的 docker 跑，需要本機有 Docker）。改 deploy.sh 時先加測試再改。

## 主機檔案

| 主機路徑 | 來源 | 權限 |
| --- | --- | --- |
| `/opt/inviti-website/docker-compose.yml` | `deploy/linode/docker-compose.yml` | root 644 |
| `/opt/inviti-website/deploy.sh` | `deploy/linode/deploy.sh` | root 700 |
| `/opt/inviti-website/.env` | 只有 `INVITI_WEBSITE_IMAGE_TAG=<SHA>` | root 600 |
| `/opt/caddy/sites/inviti-website.caddy` | `deploy/linode/inviti-website.caddy`（正式切換時才放） | root 644 |

自動部署只換映像 tag，不會更新上述檔案本身。改了 repo 裡的檔案要自己裝到主機，例如：

```bash
scp -i ~/.ssh/id_ed25519_tool_web -o IdentitiesOnly=yes deploy/linode/deploy.sh root@172.104.120.210:/tmp/deploy.sh
ssh -i ~/.ssh/id_ed25519_tool_web -o IdentitiesOnly=yes root@172.104.120.210 \
  'install -o root -g root -m 700 /tmp/deploy.sh /opt/inviti-website/deploy.sh && rm /tmp/deploy.sh'
```

改 compose 後在主機 `/opt/inviti-website` 執行 `docker compose up -d`。

## 主機一次性設定

以下以 root 在主機執行。GHCR 登入、`deploy` 使用者、Caddy 與 `proxy` 網路都是 tool-web 搬遷時建立的，整台主機共用。

### 1. 目錄與檔案

```bash
install -o root -g root -m 755 -d /opt/inviti-website
# 從自己的電腦 scp docker-compose.yml、deploy.sh 到 /tmp 後：
install -o root -g root -m 644 /tmp/docker-compose.yml /opt/inviti-website/docker-compose.yml
install -o root -g root -m 700 /tmp/deploy.sh /opt/inviti-website/deploy.sh
install -o root -g root -m 600 /dev/null /opt/inviti-website/.env
```

`.env` 先留空，第一次執行 `deploy.sh` 會自動補上 `INVITI_WEBSITE_IMAGE_TAG`。

### 2. GHCR 登入（已完成，共用）

主機以 STRfong 的 classic PAT（只勾 `read:packages`）登入 GHCR，可讀 STRfong 名下所有 private 映像，包含 `inviti-website`，不用另外設定。PAT 到期的處理見 VIPSystem 的 `deploy/linode/README.md`。

### 3. sudo 權限

```bash
echo 'deploy ALL=(root) NOPASSWD: /opt/inviti-website/deploy.sh' > /etc/sudoers.d/inviti-website-deploy
chmod 440 /etc/sudoers.d/inviti-website-deploy
visudo -cf /etc/sudoers.d/inviti-website-deploy
```

### 4. GitHub Actions 專用金鑰（每個專案各一把）

在自己的電腦上產生一把只給官網用的 ed25519 金鑰（註解 `github-actions-inviti-website`），公鑰以 forced command 加到 `/home/deploy/.ssh/authorized_keys`（另起一行，不動 tool-web、vipsystem 那兩行）：

```
command="sudo -n /opt/inviti-website/deploy.sh $SSH_ORIGINAL_COMMAND",no-pty,no-port-forwarding,no-agent-forwarding,no-X11-forwarding,no-user-rc ssh-ed25519 AAAA… github-actions-inviti-website
```

驗證：

```bash
ssh -i <金鑰> deploy@172.104.120.210 ls         # 應該 exit 2
ssh -i <金鑰> deploy@172.104.120.210            # 應該 exit 2，沒有 shell
```

金鑰外洩時：刪掉 authorized_keys 那一行、`gh variable set DEPLOY_ENABLED --body false -R STRfong/INVITI-Website`，再重新產生金鑰。最多只能讓主機重新部署 GHCR 上已有的某個官網 commit，碰不到其他專案。

### 5. GitHub repo 設定

**這個 repo 是 fork，GitHub 預設停用 fork 的 Actions**：先到 repo 的 Actions 分頁按「I understand my workflows, go ahead and enable them」。

```bash
gh secret set DEPLOY_SSH_KEY -R STRfong/INVITI-Website < <私鑰檔>             # 設定後刪掉本機私鑰
gh secret set DEPLOY_HOST -R STRfong/INVITI-Website --body 172.104.120.210
gh secret set DEPLOY_KNOWN_HOSTS -R STRfong/INVITI-Website < <known_hosts 檔>  # 可沿用 vipsystem 那份
gh variable set DEPLOY_ENABLED -R STRfong/INVITI-Website --body true          # 正式切換並確認穩定後才設
```

第一次 build 推上 GHCR 後，到 STRfong 的 Packages → `inviti-website` → Package settings：

- **Visibility** 維持 **Private**。
- **Manage Actions access** 讓 `STRfong/INVITI-Website` 有 **Admin** 權限，cleanup job 才能刪除舊版本。

## 日常操作（在主機 /opt/inviti-website）

| 要做的事 | 指令 |
| --- | --- |
| 看部署結果 | GitHub repo 的 Actions 頁面，`deploy` job 的 log 會印出新舊 tag 與健康檢查結果 |
| 看目前版本 | `grep INVITI_WEBSITE_IMAGE_TAG .env` |
| 手動部署某個 commit | `./deploy.sh <40 碼 SHA>` |
| 退回上一版 | `docker image ls ghcr.io/strfong/inviti-website` 找上一個 SHA，`./deploy.sh <上一個 SHA>` |
| 暫停自動部署 | `gh variable set DEPLOY_ENABLED --body false -R STRfong/INVITI-Website`（仍會建置，只是不部署） |
| 看 log | `docker compose logs -f --tail=100 web` |

## 搬遷：試跑與正式切換

來源是 Zeabur 上的 INVITI-Website 服務（根目錄 Dockerfile，綁 `inviti.vip`）。

### 試跑（不影響 Zeabur）

1. 完成上面的一次性設定（`DEPLOY_ENABLED` 先不要設），push 到 `main` 讓 CI 建出第一個映像。
2. 在主機執行 `/opt/inviti-website/deploy.sh <CI 建出的 SHA>`，應該 exit 0。
3. DNS 還沒切，Caddy 不放 `inviti-website.caddy`。從主機上的 Caddy 容器直接驗證：
   ```bash
   cd /opt/caddy
   docker compose exec caddy wget -qO- http://inviti-website-web:8080/ | head -5
   docker compose exec caddy wget -qO- http://inviti-website-web:8080/blog | grep -c 'id="root"'
   ```

### 正式切換

1. 事先記下 `inviti.vip`、`www.inviti.vip` 目前的 DNS 紀錄（回滾用）；確認 Cloudflare「一律使用 HTTPS」關閉、加密模式不是「彈性」。
2. `inviti-website.caddy` 放進 `/opt/caddy/sites/`，在 `/opt/caddy` 執行 `docker compose exec caddy caddy validate --config /etc/caddy/Caddyfile && docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile`。
3. 把 `inviti.vip` 與 `www.inviti.vip` 的 A 紀錄改成 `172.104.120.210`（Proxied），等 Caddy 取得兩個網域的憑證。
4. 從外部驗證：首頁、`/blog`、`/help-center`、直接開某篇 `/blog/...`、`https://www.inviti.vip/blog` 301 到 `https://inviti.vip/blog`、圖片與 GIF 正常載入。
5. 收尾：Cloudflare 加密模式改「完整（嚴格）」、設 `DEPLOY_ENABLED=true`、Zeabur 服務暫停或斷開 Git 來源（避免兩邊都在建置）。確認 Zeabur 停用後，可以把根目錄的 `Dockerfile` 換成 `deploy/linode/Dockerfile`。

### 回滾

DNS 改回切換前記下的值，在 Zeabur 重新啟動服務。官網沒有資料，不需要回寫任何東西。
