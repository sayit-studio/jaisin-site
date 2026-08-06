// 後台（Payload headless）連線層。
// VITE_CMS_URL 未設定（例如純靜態部署、後台未上線）時 → 回傳 null，
// 前台一律退回元件內原本的硬寫資料，外觀完全不變、永不破版。
export const CMS_URL = import.meta.env.VITE_CMS_URL || ''

export async function fetchCms(path) {
  if (!CMS_URL) return null
  try {
    const res = await fetch(`${CMS_URL}${path}`)
    if (!res.ok) return null
    const data = await res.json()
    if (data && data.error) return null
    return data
  } catch {
    return null // 靜默失敗 → 用 fallback
  }
}
