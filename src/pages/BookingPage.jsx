import { useEffect, useState } from 'react'
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Home, ShieldCheck } from 'lucide-react'
import Seo from '../components/seo/Seo'
import './BookingPage.css'

const EMPTY_FORM = {
  name: '', phone: '', inspectionType: '新成屋初驗', community: '', address: '', building: '', floor: '',
  layout: '', hasCustomization: false, originalLayout: '', customizedLayout: '', deedArea: '',
  hasTerrace: false, terraceArea: '', preferred1: '', preferred2: '', preferred3: '',
  accessConfirmed: false, contactName: '', contactPhone: '', notes: '', consent: false,
}
const STEPS = ['聯絡資料', '房屋資料', '希望時間', '確認送出']
const phoneValid = (value) => /^09\d{8}$/.test(value.replace(/[^0-9]/g, ''))

function loadLiff() {
  if (window.liff) return Promise.resolve(window.liff)
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-liff-sdk]')
    if (existing) { existing.addEventListener('load', () => resolve(window.liff)); return }
    const script = document.createElement('script')
    script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js'
    script.dataset.liffSdk = 'true'
    script.onload = () => resolve(window.liff)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function BookingPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(EMPTY_FORM)
  const [lineProfile, setLineProfile] = useState(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  useEffect(() => {
    const liffId = import.meta.env.VITE_LIFF_BOOKING_ID
    if (!liffId || liffId.startsWith('1234567890-')) return
    loadLiff().then(async (liff) => {
      await liff.init({ liffId })
      if (!liff.isLoggedIn()) { liff.login(); return }
      const profile = await liff.getProfile()
      setLineProfile({ userId: profile.userId, displayName: profile.displayName })
      setForm((prev) => ({ ...prev, name: prev.name || profile.displayName }))
    }).catch(() => setError('目前無法取得 LINE 身分，請重新開啟此頁。'))
  }, [])

  const validateStep = () => {
    if (step === 0 && (!form.name.trim() || !phoneValid(form.phone))) return '請填寫姓名與正確的手機號碼。'
    if (step === 1 && (!form.community.trim() || !form.address.trim() || !form.layout.trim() || !form.deedArea)) return '請完整填寫社區、地址、格局與權狀坪數。'
    if (step === 1 && form.hasCustomization && (!form.originalLayout.trim() || !form.customizedLayout.trim())) return '請填寫原房型與客變後房型。'
    if (step === 1 && form.hasTerrace && !form.terraceArea) return '請填寫露台坪數。'
    if (step === 2 && (!form.preferred1 || !form.preferred2)) return '請至少提供兩個希望日期與時間。'
    return ''
  }
  const next = () => { const message = validateStep(); if (message) return setError(message); setError(''); setStep((value) => Math.min(value + 1, 3)); window.scrollTo(0, 0) }
  const back = () => { setError(''); setStep((value) => Math.max(value - 1, 0)); window.scrollTo(0, 0) }

  const submit = async () => {
    if (!form.consent) return setError('請同意個資蒐集與預約規則。')
    const webhookUrl = import.meta.env.VITE_BOOKING_WEBHOOK_URL
    if (!webhookUrl || webhookUrl.includes('your-n8n-instance.com')) return setError('預約服務尚未完成連線，請聯繫宅心驗屋。')
    setError(''); setStatus('submitting')
    try {
      const response = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'inspection_booking', ...form, phone: form.phone.replace(/[^0-9]/g, ''), lineUserId: lineProfile?.userId || '', lineDisplayName: lineProfile?.displayName || '', source: 'LIFF' }) })
      if (!response.ok) throw new Error()
      setStatus('success')
    } catch { setStatus('idle'); setError('預約申請送出失敗，請稍後再試或透過 LINE 聯繫。') }
  }

  if (status === 'success') return <main className="booking-page booking-success"><Seo routeKey="booking" fallback={{ title: '驗屋預約申請｜宅心驗屋', noindex: true }} /><CheckCircle2 size={56} /><h1>預約申請已送出</h1><p>這不是正式預約。宅心驗屋確認人員與時間後，會再透過 LINE 與你聯繫。</p></main>

  return <main className="booking-page">
    <Seo routeKey="booking" fallback={{ title: '驗屋預約申請｜宅心驗屋', description: '宅心驗屋客戶專用驗屋預約申請頁。', noindex: true }} />
    <header className="booking-header"><div className="booking-brand"><span className="booking-mark"><Home size={20} /></span><div><strong>宅心驗屋</strong><small>預約申請</small></div></div><ShieldCheck size={22} /></header>
    <div className="booking-shell">
      <section className="booking-intro"><p>INSPECTION BOOKING</p><h1>驗屋預約申請</h1><span>填寫希望時間後，我們會確認人員與排程；收到 LINE 確認通知才代表預約正式成立。</span></section>
      <ol className="booking-steps">{STEPS.map((label, index) => <li key={label} className={index <= step ? 'is-active' : ''}><b>{index + 1}</b><span>{label}</span></li>)}</ol>
      <section className="booking-card">
        {step === 0 && <div className="booking-section"><h2>聯絡資料</h2>{lineProfile && <p className="booking-line-user">LINE 已連結：{lineProfile.displayName}</p>}<Field label="姓名" required><input value={form.name} onChange={set('name')} placeholder="王小明" /></Field><Field label="電話" required><input type="tel" value={form.phone} onChange={set('phone')} placeholder="0912-345-678" inputMode="tel" /></Field></div>}
        {step === 1 && <div className="booking-section"><h2>房屋資料</h2><Field label="驗屋類型" required><select value={form.inspectionType} onChange={set('inspectionType')}><option>新成屋初驗</option><option>中古屋</option><option>透天別墅</option><option>複驗</option><option>其他</option></select></Field><Field label="社區／建案名稱" required><input value={form.community} onChange={set('community')} /></Field><Field label="驗屋地址" required><input value={form.address} onChange={set('address')} /></Field><div className="booking-grid"><Field label="棟別"><input value={form.building} onChange={set('building')} /></Field><Field label="樓層"><input value={form.floor} onChange={set('floor')} /></Field></div><Field label="房屋格局" required><input value={form.layout} onChange={set('layout')} placeholder="例如：3 房 2 廳 2 衛" /></Field><Field label="權狀坪數" required><input type="number" min="0" step="0.1" value={form.deedArea} onChange={set('deedArea')} placeholder="坪" /></Field><Toggle label="是否有客變" checked={form.hasCustomization} onChange={set('hasCustomization')} />{form.hasCustomization && <div className="booking-grid"><Field label="原房型" required><input value={form.originalLayout} onChange={set('originalLayout')} /></Field><Field label="客變後房型" required><input value={form.customizedLayout} onChange={set('customizedLayout')} /></Field></div>}<Toggle label="是否為露台戶" checked={form.hasTerrace} onChange={set('hasTerrace')} />{form.hasTerrace && <Field label="露台坪數" required><input type="number" min="0" step="0.1" value={form.terraceArea} onChange={set('terraceArea')} placeholder="坪" /></Field>}</div>}
        {step === 2 && <div className="booking-section"><h2>希望驗屋時間</h2><p className="booking-help">請提供 2–3 個可配合的日期與時間，我們會再確認實際排程。</p><Field label="日期／時段 1" required><input type="datetime-local" value={form.preferred1} onChange={set('preferred1')} /></Field><Field label="日期／時段 2" required><input type="datetime-local" value={form.preferred2} onChange={set('preferred2')} /></Field><Field label="日期／時段 3"><input type="datetime-local" value={form.preferred3} onChange={set('preferred3')} /></Field><Toggle label="已向建商確認可於上述日期進場" checked={form.accessConfirmed} onChange={set('accessConfirmed')} /><div className="booking-grid"><Field label="現場聯絡人"><input value={form.contactName} onChange={set('contactName')} /></Field><Field label="現場聯絡人電話"><input type="tel" value={form.contactPhone} onChange={set('contactPhone')} /></Field></div><Field label="特殊需求／備註"><textarea value={form.notes} onChange={set('notes')} rows="4" /></Field></div>}
        {step === 3 && <div className="booking-section"><h2>確認並送出</h2><Summary form={form} /><label className="booking-consent"><input type="checkbox" checked={form.consent} onChange={set('consent')} /><span>我同意宅心驗屋蒐集以上資料，用於預約安排及聯繫，並了解送出申請不代表預約成立。</span></label></div>}
        {error && <p className="booking-error" role="alert">{error}</p>}
        <div className="booking-actions">{step > 0 && <button type="button" className="booking-back" onClick={back}><ChevronLeft size={18} />上一步</button>}{step < 3 ? <button type="button" className="booking-next" onClick={next}>下一步<ChevronRight size={18} /></button> : <button type="button" className="booking-next" disabled={status === 'submitting'} onClick={submit}>{status === 'submitting' ? '送出中…' : '送出預約申請'}<CalendarDays size={18} /></button>}</div>
      </section>
    </div>
  </main>
}

function Field({ label, required, children }) { return <label className="booking-field"><span>{label}{required && <em>必填</em>}</span>{children}</label> }
function Toggle({ label, checked, onChange }) { return <label className="booking-toggle"><input type="checkbox" checked={checked} onChange={onChange} /><span>{label}</span></label> }
function Summary({ form }) { return <dl className="booking-summary"><div><dt>聯絡人</dt><dd>{form.name}・{form.phone}</dd></div><div><dt>物件</dt><dd>{form.community}／{form.building || '未填棟別'}／{form.floor || '未填樓層'}</dd></div><div><dt>格局坪數</dt><dd>{form.layout}・{form.deedArea} 坪</dd></div><div><dt>希望時間</dt><dd>{[form.preferred1, form.preferred2, form.preferred3].filter(Boolean).map((value) => value.replace('T', ' ')).join('、')}</dd></div></dl> }
