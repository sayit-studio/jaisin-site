// 驗屋說明會場次。頁面僅顯示日期，報名統一導向 LINE。
export const seminars = [
  { id: 'seminar-2026-08-04', date: '2026-08-04', status: 'active' },
  { id: 'seminar-2026-08-15', date: '2026-08-15', status: 'active' },
  { id: 'seminar-2026-08-28', date: '2026-08-28', status: 'active' },
  { id: 'seminar-2026-09-05', date: '2026-09-05', status: 'active' },
  { id: 'seminar-2026-09-16', date: '2026-09-16', status: 'active' },
  { id: 'seminar-2026-09-28', date: '2026-09-28', status: 'active' },
  { id: 'seminar-2026-10-08', date: '2026-10-08', status: 'active' },
  { id: 'seminar-2026-10-17', date: '2026-10-17', status: 'active' },
  { id: 'seminar-2026-10-30', date: '2026-10-30', status: 'active' },
]

function parseLocalDate(value) {
  if (!value) return null
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

export function filterActiveSeminars(list) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (list ?? []).filter((seminar) => {
    if (seminar.status === 'cancelled') return false
    const eventDate = parseLocalDate(seminar.date)
    if (!eventDate) return true
    const eventMonth = new Date(eventDate.getFullYear(), eventDate.getMonth(), 1)
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    return eventMonth >= currentMonth
  })
}

export function getActiveSeminars() {
  return filterActiveSeminars(seminars)
}