# 同步 Upstream 並推送至自己 Fork 的流程

## Remote 配置

本專案有兩個 remote：

| Remote     | 位址                                          | 說明                   |
| ---------- | --------------------------------------------- | ---------------------- |
| `origin`   | `STRfong/INVITI-Website`                      | 自己的 fork，可以 push |
| `upstream` | `jerry914/INVITI-Website`                     | 原始 repo，只拉取更新  |

檢查指令：

```bash
git remote -v
```

---

## 標準同步流程

```bash
# 1. 抓取 upstream 最新內容（不會動到本地分支）
git fetch upstream

# 2. 切到 main 分支
git checkout main

# 3. 把 upstream/main 合併進來
git merge upstream/main

# 4. 若有衝突 → 解衝突 → git add <file> → git commit
#    若無衝突 → 自動產生 merge commit

# 5. 推到自己的 fork
git push origin main
```

> 若要保留線性歷史可用 `git rebase upstream/main` 取代第 3 步，但因為本專案過去歷史都是 merge commit，延用 `merge` 即可，不需要 force push。

---

## 已知衝突點與處理方式

### 1. `vite.config.ts` — `base` 與 `outDir`

這是最常見的衝突來源，因為 **本 fork 與 upstream 部署目標不同**：

| 設定     | upstream（GitHub Pages） | 本 fork（Zeabur） |
| -------- | ------------------------ | ----------------- |
| `base`   | `/INVITI-Website/`       | `/`               |
| `outDir` | `build`（歷史上）        | `dist`            |

**解決方式：一律保留 HEAD（自己這邊）的值**

衝突會長這樣：

```ts
export default defineConfig({
<<<<<<< HEAD
  base: '/',
=======
    base: '/INVITI-Website/',
>>>>>>> upstream/main
    plugins: [react()],
```

改成：

```ts
export default defineConfig({
  base: '/',
    plugins: [react()],
```

出處 commit：`c602815 update: 調整符合 Zeabur 輸出`

---

## 其他可能出現的衝突

當 upstream 改動你也曾改過的檔案時，都可能衝突。常見位置：

- `package.json` / `package-lock.json` — 依賴版本差異
- `index.html` — title、meta、路徑
- 路由或環境變數相關檔案 — 部署環境差異
- 任何你因 Zeabur 部署而修改的設定檔

處理原則：

1. **部署相關設定（base path、outDir、domain、env）** → 保留自己的版本
2. **功能更新（新功能、bug fix、翻譯、內容更新）** → 採用 upstream 的版本
3. **兩邊都改過同一段邏輯** → 仔細讀 diff，必要時手動合併兩邊

---

## 常用檢查指令

```bash
# 看 upstream 有哪些新 commit 還沒合進來
git log --oneline upstream/main ^HEAD

# 看自己領先 origin/main 幾個 commit
git log --oneline origin/main..HEAD

# 衝突發生時列出所有未合併檔案
git status

# 想放棄這次 merge 重來
git merge --abort
```

---

## 緊急回滾

如果 push 後才發現 merge 有問題（例如解錯衝突）：

```bash
# 還沒 push 之前
git reset --hard HEAD~1   # 退回 merge 前

# 已經 push 了（會改寫遠端歷史，謹慎使用）
git reset --hard <合併前的 commit hash>
git push --force-with-lease origin main
```
