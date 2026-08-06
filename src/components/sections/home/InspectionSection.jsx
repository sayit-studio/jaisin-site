import { Droplets, ArrowDownToLine, DoorOpen, Ruler, Zap, FileCheck2 } from 'lucide-react'
import './InspectionSection.css'
import NextSectionCue from '../../ui/NextSectionCue'

const CATEGORIES = [
  {
    icon: Droplets,
    title: '防水與滲漏',
    desc: '確認窗框、浴室與牆面是否有滲水或含水異常。',
    items: ['窗框淋水與嵌縫', '浴室防水與積水', '牆面、天花板水氣'],
  },
  {
    icon: ArrowDownToLine,
    title: '給水與排水',
    desc: '實際測試用水與排水狀況，找出漏水、阻塞或坡度問題。',
    items: ['水壓與出水測試', '排水速度與坡度', '管線滲漏與異音'],
  },
  {
    icon: Zap,
    title: '用電與弱電安全',
    desc: '逐一確認插座、配電與弱電設備是否能安全正常使用。',
    items: ['插座極性與接地', '漏電保護與迴路', '網路、電話與對講機'],
  },
  {
    icon: Ruler,
    title: '牆面、地坪與磁磚',
    desc: '檢查施工面的平整度、垂直度，以及磁磚空鼓與裂縫。',
    items: ['地板水平與牆面垂直', '磁磚空鼓檢查', '裂縫與表面缺失'],
  },
  {
    icon: DoorOpen,
    title: '門窗與固定設備',
    desc: '確認日常會操作的門窗、五金及現場設備功能是否正常。',
    items: ['門窗開闔與密合', '玻璃、膠條與五金', '廚衛設備功能'],
  },
  {
    icon: FileCheck2,
    title: '儀器輔助與完整紀錄',
    desc: '以專業儀器協助判讀，並將每項缺失整理成清楚紀錄。',
    items: ['熱顯像與雷射量測', '缺失照片與位置', 'PDF 驗屋報告'],
  },
]

export default function InspectionSection() {
  return (
    <section id="inspection-details" className="inspection-section bg-dark section home-section home-section--immersive">
      <div className="container inspection-section__container">
        <div className="inspection-halo" aria-hidden="true">
          <span className="inspection-halo__ring inspection-halo__ring--1" />
          <span className="inspection-halo__ring inspection-halo__ring--2" />
          <span className="inspection-halo__ring inspection-halo__ring--3" />
          <span className="inspection-halo__center" />
        </div>

        <div className="inspection-section__header" data-reveal>
          <h2 className="text-h2 inspection-section__title"><span className="inspection-section__highlight">100 多項</span>全方位專業檢測</h2>
          <p className="inspection-section__sub">
            從肉眼可見的屋況，到防水、排水、用電與設備功能，依照標準流程逐區檢查並留下照片紀錄。
          </p>
        </div>

        <div className="inspection-section__grid" data-stagger>
          {CATEGORIES.map(({ icon: Icon, title, desc, items }) => (
            <article key={title} className="inspect-cat">
              <span className="inspect-cat__icon"><Icon size={22} strokeWidth={1.5} /></span>
              <div className="inspect-cat__content">
                <h3 className="inspect-cat__title">{title}</h3>
                <p className="inspect-cat__desc">{desc}</p>
                <ul className="inspect-cat__items">
                  {items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
      <NextSectionCue target="inspection-process" label="服務如何進行" tone="dark" />
    </section>
  )
}
