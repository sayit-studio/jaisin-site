import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // ── 部署路徑的唯一來源 ────────────────────────────────
  // 全站（router basename、資產路徑）皆由此推導，見 src/config/site.js。
  // 正式部署在 Cloudflare Pages 根目錄，故預設 '/'。
  //
  // SPA 深層路由的 fallback 由 public/_redirects 的 `/* /index.html 200` 接管。
  // 原本 GitHub Pages 專用的 public/404.html 跳轉修補與 spaFallback404 外掛
  // 已於 2026-08-17 移除 —— 它會搶在 _redirects 之前吃掉所有未命中的請求。
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
})
