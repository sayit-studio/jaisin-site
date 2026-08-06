/**
 * 站台路徑與網域的單一設定來源。
 *
 * 全站不再硬寫 `/jaisin/`。要換部署路徑（例如從 GitHub Pages 的
 * `/jaisin/` 搬到 Cloudflare Pages 的根目錄），只需改 `vite.config.js`
 * 的 `base` 一處，這裡的 BASE 會自動跟著變。
 */

// Vite 內建：值永遠等於 vite.config.js 的 base，結尾必帶 `/`。
export const BASE = import.meta.env.BASE_URL

/**
 * public/ 底下的靜態資產路徑。
 * 傳入不含 base 的路徑即可，開頭的 `/` 會被忽略。
 *   asset('assets/og/og-home.jpg') → '/jaisin/assets/og/og-home.jpg'
 */
export function asset(path = '') {
  return BASE + String(path).replace(/^\/+/, '')
}

/**
 * 正式網域（含 protocol，結尾不帶 `/`），例如 'https://www.zhaixin.tw'。
 *
 * 網域尚未定案，故預設為空字串。留空時 absoluteUrl() 一律回傳空字串，
 * 由呼叫端決定不輸出該標籤 —— 不輸出，好過輸出一個錯的絕對網址。
 */
export const SITE_ORIGIN = (import.meta.env.VITE_SITE_ORIGIN || '').replace(/\/+$/, '')

/** 是否已具備產出絕對網址的條件（canonical / og:url / og:image 需要）。 */
export const hasOrigin = Boolean(SITE_ORIGIN)

/**
 * 轉成絕對網址；網域未設定時回傳 ''。
 * 已經是絕對網址（http/https 開頭）則原樣回傳。
 */
export function absoluteUrl(path = '') {
  const value = String(path)
  if (/^https?:\/\//i.test(value)) return value
  if (!SITE_ORIGIN) return ''
  return SITE_ORIGIN + asset(value)
}
