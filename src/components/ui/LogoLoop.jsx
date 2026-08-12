import { useState } from 'react'
import './LogoLoop.css'

/* 服務足跡：縣市 → 該縣市已服務的社區建案 */
const FOOTPRINT = [
  { city: '桃園', x: 37, y: 44, cases: ['中壢・首席大院', '八德・帝峰'] },
  { city: '新竹', x: 32, y: 64, cases: ['竹北・豐邑米蘭'] },
  { city: '台中', x: 25, y: 108, cases: ['龍井・新貌社區', '七期・美術館特區', '北屯・中科新美地', '烏日・高鐵首席', '太平・御花園', '西屯・七期名宅'] },
  { city: '彰化', x: 23, y: 132, cases: ['田中・富春山居'] },
  { city: '台南', x: 39, y: 212, cases: ['安平・大員皇居'] },
  { city: '高雄', x: 52, y: 242, cases: ['左營・日光城'] },
]

const STATS = [
  { value: '130+', label: '服務社區' },
  { value: '50+', label: '品牌建商' },
  { value: '8+', label: '服務縣市' },
]

/* 低多邊形台灣輪廓（自繪示意圖，非地圖資料） */
const TAIWAN_PATH = `
  M30 26 L50 14 L76 16 L88 28 L84 46 L96 62 L104 92 L112 128
  L118 168 L118 204 L110 238 L98 266 L88 288 L82 308 L76 320
  L70 312 L64 292 L52 274 L44 246 L34 214 L24 182 L16 150
  L12 126 L14 104 L20 80 L26 58 L32 38 Z
`

function Marquee({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="footprint-marquee">
      <div className={`footprint-marquee__track${reverse ? ' is-reverse' : ''}`}>
        {doubled.map((name, i) => (
          <span key={i} className="footprint-chip">{name}</span>
        ))}
      </div>
    </div>
  )
}

export default function LogoLoop() {
  const [active, setActive] = useState('台中')
  const current = FOOTPRINT.find((f) => f.city === active) ?? FOOTPRINT[0]

  const allCases = FOOTPRINT.flatMap((f) => f.cases.map((c) => `${f.city}・${c.split('・')[1]}`))
  const half = Math.ceil(allCases.length / 2)

  return (
    <section id="footprint" className="footprint" aria-label="服務足跡">
      <div className="container footprint__container">
        <header className="footprint__head" data-reveal>
          <h2 className="text-h2">服務足跡遍及全台</h2>
          <p className="footprint__sub">從北到南逐案把關，130+ 社區建案的交屋現場都有宅心在場。</p>
        </header>

        <div className="footprint__body">
          <div className="footprint__map" data-reveal>
            <svg viewBox="0 0 140 340" role="img" aria-label="宅心驗屋服務縣市分佈示意圖">
              <path className="footprint__island" d={TAIWAN_PATH} />
              {FOOTPRINT.map((f) => (
                <g
                  key={f.city}
                  className={`footprint__pin${f.city === active ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(f.city)}
                  onFocus={() => setActive(f.city)}
                  onClick={() => setActive(f.city)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(f.city) } }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${f.city}，${f.cases.length} 個社區建案`}
                >
                  <circle className="footprint__pin-halo" cx={f.x} cy={f.y} r="11" />
                  <circle className="footprint__pin-dot" cx={f.x} cy={f.y} r="4" />
                  <text className="footprint__pin-label" x={f.x + 16} y={f.y + 4}>{f.city}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="footprint__panel">
            <ul className="footprint__stats" data-stagger>
              {STATS.map((s) => (
                <li key={s.label} className="footprint__stat">
                  <span className="footprint__stat-value text-number">{s.value}</span>
                  <span className="footprint__stat-label">{s.label}</span>
                </li>
              ))}
            </ul>

            <div className="footprint__detail" data-reveal>
              <p className="footprint__detail-city">{current.city}</p>
              <ul className="footprint__detail-list">
                {current.cases.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <p className="footprint__note">以上為部分服務社區，實際案件依委託情形而定。</p>
            </div>
          </div>
        </div>

        <div className="footprint__marquees" aria-hidden="true">
          <Marquee items={allCases.slice(0, half)} />
          <Marquee items={allCases.slice(half)} reverse />
        </div>
      </div>
    </section>
  )
}
