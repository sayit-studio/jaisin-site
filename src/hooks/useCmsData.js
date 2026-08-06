import { useEffect, useState } from 'react'
import { fetchCms } from '../lib/cms'

// 取後台內容；尚未載入或失敗時回傳 null，呼叫端以「useCmsData(...) ?? 硬寫值」使用。
// 例：const reviews = useCmsData('/api/content/reviews?locale=zh') ?? REVIEWS
export function useCmsData(path) {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    fetchCms(path).then((d) => { if (alive) setData(d) })
    return () => { alive = false }
  }, [path])
  return data
}
