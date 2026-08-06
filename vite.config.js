import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

/**
 * public/404.html 是 GitHub Pages 的 SPA 深層路由修補，其中
 * `pathSegmentsToKeep` 必須等於 base 的路徑層數（'/jaisin/' → 1、'/' → 0）。
 * public/ 的檔案不會被 Vite 處理，所以在 build 完成後就地改寫，
 * 讓它跟著 base 走，不用人工同步。
 *
 * 備註：搬到 Cloudflare Pages 後由 _redirects 接管 SPA fallback，
 * 這份 404.html 修補即可整個移除。
 */
function spaFallback404() {
  let config
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(resolved) { config = resolved },
    closeBundle() {
      const file = path.join(config.root, config.build.outDir, '404.html')
      if (!fs.existsSync(file)) return
      const segments = config.base.split('/').filter(Boolean).length
      const html = fs.readFileSync(file, 'utf8')
        .replace(/var pathSegmentsToKeep = \d+/, `var pathSegmentsToKeep = ${segments}`)
      fs.writeFileSync(file, html)
    },
  }
}

export default defineConfig({
  // ── 部署路徑的唯一來源 ────────────────────────────────
  // 全站（router basename、資產路徑、404 修補）皆由此推導，
  // 見 src/config/site.js。搬到根目錄部署時改成 '/' 即可。
  base: process.env.VITE_BASE_PATH || '/jaisin/',
  plugins: [react(), spaFallback404()],
})
