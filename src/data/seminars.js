// 說明會場次資料
// status: 'active' | 'full' | 'cancelled' | 'postponed'
// spotsLeft: -1 = 不顯示人數
export const seminars = [
  {
    id: 'seminar-demo-2026-07-11',
    title: '完整驗屋流程說明會',
    date: '2026-07-11',
    time: '14:00',
    endTime: '15:00',
    location: '臺中市北屯區新平里敦平二街19號',
    address: '臺中市北屯區新平里敦平二街19號',
    capacity: 20,
    spotsLeft: 20,
    status: 'active',
    registrationDeadline: '2026-07-09',
    demo: true,
  },
  {
    id: 'seminar-demo-2026-07-25',
    title: '完整驗屋流程說明會',
    date: '2026-07-25',
    time: '14:00',
    endTime: '15:00',
    location: '臺中市北屯區新平里敦平二街19號',
    address: '臺中市北屯區新平里敦平二街19號',
    capacity: 20,
    spotsLeft: 20,
    status: 'active',
    registrationDeadline: '2026-07-23',
    demo: true,
  },
  {
    id: 'seminar-demo-2026-08-08',
    title: '完整驗屋流程說明會',
    date: '2026-08-08',
    time: '14:00',
    endTime: '15:00',
    location: '臺中市北屯區新平里敦平二街19號',
    address: '臺中市北屯區新平里敦平二街19號',
    capacity: 20,
    spotsLeft: 20,
    status: 'active',
    registrationDeadline: '2026-08-07',
    demo: true,
  },
]

// 'YYYY-MM-DD' 以本地時區解析（直接 new Date('YYYY-MM-DD') 會被當成 UTC 午夜，
// 在 UTC+8 會整整差 8 小時，導致當日場次的比較結果不一致）。
function parseLocalDate(value) {
  if (!value) return null
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

// 判斷場次是否應顯示（純函式，可套用在本機或 CMS 來源）
export function filterActiveSeminars(list) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (list ?? []).filter((s) => {
    if (s.status === 'cancelled') return false

    const eventDate = parseLocalDate(s.date)
    if (eventDate && eventDate < today) return false

    const deadline = parseLocalDate(s.registrationDeadline)
    if (deadline && deadline < today) return false

    return true
  })
}

export function getActiveSeminars() {
  return filterActiveSeminars(seminars)
}
