# 宅心驗屋新版官網

宅心驗屋 React／Vite 官方網站原始碼。

## 本機開發

```bash
npm install
npm run dev -- --port 3030
```

## 正式建置

```bash
npm run build
```

推送至 `main` 後，GitHub Actions 會自動建置並部署至 GitHub Pages：

https://sayit-studio.github.io/jaisin-site/

正式部署會使用 `/jaisin-site/` base path；本機預覽維持 `/jaisin/`。