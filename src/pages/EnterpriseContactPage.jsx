import { useState } from 'react'
import { MessageCircle, CheckCircle, AlertCircle } from 'lucide-react'
import Seo from '../components/seo/Seo'
import './EnterpriseContactPage.css'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'
const WEBHOOK_URL = import.meta.env.VITE_ENTERPRISE_WEBHOOK_URL

const PROPERTY_TYPES = ['新成屋社區', '中古屋建案', '商辦廠房', '其他']
const REFERRAL_OPTIONS = ['LINE OA', 'Instagram', 'Facebook', '朋友推薦', '搜尋引擎', '其他']

const INITIAL_FORM = {
  company: '', contact: '', title: '', phone: '', email: '',
  propertyType: '', estimatedUnits: '', timeline: '', description: '', referral: '',
}

export default function EnterpriseContactPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errors, setErrors] = useState({})

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.company.trim()) e.company = '請填寫公司名稱'
    if (!form.contact.trim()) e.contact = '請填寫聯絡人姓名'
    if (!form.phone.trim()) e.phone = '請填寫聯絡電話'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = '請填寫有效的 Email'
    if (!form.propertyType) e.propertyType = '請選擇物件類型'
    if (form.description.trim().length < 20) e.description = '需求說明至少 20 字'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('submitting')

    const payload = {
      timestamp: new Date().toISOString(),
      source: 'enterprise-form',
      ...form,
    }

    try {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="enterprise-result">
        <CheckCircle size={48} color="var(--color-success)" />
        <h1 className="enterprise-result__title">感謝您的詢問</h1>
        <p className="enterprise-result__desc">
          我們已收到您的企業合作需求。<br />
          通常會在 1–2 個工作日內透過電話或 Email 聯繫您。<br />
          如有緊急需求，也歡迎直接透過 LINE 與我們聯繫。
        </p>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <MessageCircle size={18} /> 透過 LINE 聯繫
        </a>
      </div>
    )
  }

  return (
    <>
      <Seo routeKey="contact-enterprise" fallback={{
        title: '企業合作洽詢 — 宅心驗屋',
        description: '建商、代銷或企業批量驗屋合作洽詢，請填寫表單，我們將於 1–2 個工作日內聯繫您。',
      }} />

      <div className="enterprise-page">
        <div className="container enterprise-page__inner">
          <div className="enterprise-page__header">
            <p className="text-label enterprise-label">企業合作</p>
            <h1 className="text-h1">企業合作洽詢</h1>
            <p className="enterprise-page__sub">
              如需安排批量驗屋或企業合作，請填寫以下表單，我們將有專人聯繫。
            </p>
          </div>

          <form className="enterprise-form" onSubmit={handleSubmit} noValidate>
            <div className="enterprise-form__section">
              <h2 className="enterprise-form__section-title">基本資訊</h2>
              <div className="enterprise-form__row">
                <div className="form-group">
                  <label className="form-label" htmlFor="company">公司 / 機構名稱 <span aria-hidden>*</span></label>
                  <input id="company" className="form-input" type="text" value={form.company} onChange={set('company')} placeholder="宅心建設股份有限公司" />
                  {errors.company && <span className="form-error">{errors.company}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact">聯絡人姓名 <span aria-hidden>*</span></label>
                  <input id="contact" className="form-input" type="text" value={form.contact} onChange={set('contact')} placeholder="王小明" />
                  {errors.contact && <span className="form-error">{errors.contact}</span>}
                </div>
              </div>
              <div className="enterprise-form__row">
                <div className="form-group">
                  <label className="form-label" htmlFor="title">職稱</label>
                  <input id="title" className="form-input" type="text" value={form.title} onChange={set('title')} placeholder="業務總監" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">聯絡電話 <span aria-hidden>*</span></label>
                  <input id="phone" className="form-input" type="tel" value={form.phone} onChange={set('phone')} placeholder="0912-345-678" />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">聯絡 Email <span aria-hidden>*</span></label>
                <input id="email" className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="example@company.com" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="enterprise-form__section">
              <h2 className="enterprise-form__section-title">合作需求</h2>
              <div className="enterprise-form__row">
                <div className="form-group">
                  <label className="form-label" htmlFor="propertyType">物件類型 <span aria-hidden>*</span></label>
                  <select id="propertyType" className="form-select" value={form.propertyType} onChange={set('propertyType')}>
                    <option value="">請選擇</option>
                    {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.propertyType && <span className="form-error">{errors.propertyType}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="estimatedUnits">預估戶數 / 棟數</label>
                  <input id="estimatedUnits" className="form-input" type="text" value={form.estimatedUnits} onChange={set('estimatedUnits')} placeholder="例：30 戶" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="timeline">預計時程</label>
                <input id="timeline" className="form-input" type="text" value={form.timeline} onChange={set('timeline')} placeholder="例：2025 年 Q3" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="description">需求說明 <span aria-hidden>*</span></label>
                <textarea id="description" className="form-textarea" value={form.description} onChange={set('description')} placeholder="請說明合作需求、物件地點、特殊需求等（至少 20 字）" rows={5} />
                {errors.description && <span className="form-error">{errors.description}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="referral">如何得知宅心</label>
                <select id="referral" className="form-select" value={form.referral} onChange={set('referral')}>
                  <option value="">請選擇（選填）</option>
                  {REFERRAL_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            {status === 'error' && (
              <div className="enterprise-form__error-banner">
                <AlertCircle size={18} />
                送出時發生問題，請稍後再試，或直接透過
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer"> LINE </a>
                與我們聯繫。
              </div>
            )}

            <button type="submit" className="btn btn-primary enterprise-form__submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? '送出中…' : '送出合作需求'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
