import { Thermometer, Ruler, Plug, Waves } from 'lucide-react'
import BeforeAfterReveal from '../../ui/BeforeAfterReveal'
import './RevealSection.css'
import { asset } from '../../../config/site'

const TOOLS = [
  { icon: Thermometer, name: '熱顯像儀', desc: '判斷牆面、窗框溫差與潛在水氣。' },
  { icon: Ruler, name: '雷射測距儀', desc: '確認空間尺寸與牆面距離，降低目測誤差。' },
  { icon: Plug, name: '插座測試器', desc: '檢測極性、接地與基本用電狀態。' },
  { icon: Waves, name: '排水檢測工具', desc: '檢查排水坡度與水流，降低維修風險。' },
]

export default function RevealSection() {
  return (
    <section className="reveal-section bg-base section">
      <div className="container">
        <div className="reveal-section__header" data-reveal>
          <p className="text-label reveal-section__label">科技檢驗設備 / Technology</p>
          <h2 className="text-h2 reveal-section__title">肉眼看不到的，讓儀器說話</h2>
          <p className="reveal-section__desc">
            拖曳下方滑桿，對比一般照片與熱顯像影像——肉眼正常的牆面，熱顯像揭示潛在漏水與水氣。
          </p>
        </div>

        <div className="reveal-section__slider" data-reveal>
          <BeforeAfterReveal
            beforeSrc={asset('assets/inspection/new-home-before-sample.png')}
            afterSrc={asset('assets/inspection/new-home-thermal-sample.png')}
            beforeLabel="肉眼視覺"
            afterLabel="熱顯像分析"
            beforeAlt="一般檢測現場示意"
            afterAlt="熱顯像檢測示意"
          />
        </div>

        <div className="reveal-section__tools" data-stagger aria-label="科技檢驗設備">
          {TOOLS.map((tool) => {
            const Icon = tool.icon
            return (
              <article key={tool.name} className="tool-mini">
                <span className="tool-mini__icon">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="tool-mini__title">{tool.name}</h3>
                  <p className="tool-mini__desc">{tool.desc}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
