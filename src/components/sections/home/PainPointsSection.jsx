import { SearchCheck, MessagesSquare, ShieldCheck } from 'lucide-react'
import './PainPointsSection.css'
import NextSectionCue from '../../ui/NextSectionCue'

const SITUATIONS = [
  {
    icon: ShieldCheck,
    title: '在重要決定前掌握房屋狀況',
    desc: '在交屋、購屋或修繕之前，先掌握問題與風險，才能做出更安心、更有依據的下一步。',
  },
  {
    icon: MessagesSquare,
    title: '留下可供修繕溝通的依據',
    desc: '把缺失照片、發生位置與現場狀況清楚記錄，讓後續協調不再只靠口頭描述。',
  },
  {
    icon: SearchCheck,
    title: '看見表面不容易發現的問題',
    desc: '透過系統化檢測與儀器輔助，釐清肉眼難以判斷的漏水、管線、用電與屋況風險。',
  },
]

export default function PainPointsSection() {
  return (
    <section id="inspection-value" className="pain-points bg-warm section home-section home-section--immersive">
      <div className="container">

        <div className="pain-points__header" data-reveal>
          <h2 className="text-h2 pain-points__title">驗屋，不只是找出問題</h2>
        </div>

        <div className="pain-points__grid" data-stagger>
          {SITUATIONS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="pain-card">
                <div className="pain-card__icon">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="pain-card__title">{item.title}</h3>
                <p className="pain-card__desc">{item.desc}</p>
              </div>
            )
          })}

        </div>
      </div>
      <NextSectionCue target="inspection-details" label="宅心如何把關" tone="light" />
    </section>
  )
}
