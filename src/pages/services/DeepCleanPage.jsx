import { Sparkles, Brush, Wind, CheckCircle2 } from 'lucide-react'
import ServiceTemplate from '../../components/sections/services/ServiceTemplate'
import { asset } from '../../config/site'

const DEEP_CLEAN = {
  routeKey: 'service-deep-clean',
  seo: {
    title: '裝潢細清｜入住前的細節收尾 — 宅心驗屋',
    description: '宅心驗屋提供裝潢細清服務，協助處理裝修後粉塵、櫃體、玻璃、五金與邊角細節，讓入住前現場更乾淨可用。',
  },
  banner: {
    desktop: asset('assets/banners/deep-clean-desktop.webp'),
    mobile: asset('assets/banners/deep-clean-mobile.webp'),
  },
  header: {
    eyebrow: '裝潢細清',
    title: '新家，就該一塵不染的開始',
    desc: '細節顧到了，放心就到位了',
  },
  points: {
    label: '服務重點',
    title: '裝潢細清四大重點',
    items: [
      { icon: Sparkles, label: '裝修粉塵細清', desc: '處理地面、牆角、櫃體與檯面的施工粉塵。' },
      { icon: Brush, label: '櫃體與五金收尾', desc: '抽屜、鉸鏈、把手、玻璃與縫隙細節清潔。' },
      { icon: Wind, label: '入住前環境整理', desc: '讓裝修後現場更接近可交屋、可入住狀態。' },
      { icon: CheckCircle2, label: '清潔後重點確認', desc: '協助檢視容易忽略的角落與清潔收尾狀態。' },
    ],
  },
  flow: {
    label: '細清流程',
    title: '四步驟完成細清',
    items: [
      { num: '01', title: 'LINE 諮詢', desc: '提供坪數、屋況與需求範圍。' },
      { num: '02', title: '確認排程', desc: '確認時段與清潔重點區域。' },
      { num: '03', title: '現場細清', desc: '逐區處理粉塵、櫃體與五金細節。' },
      { num: '04', title: '收尾確認', desc: '檢視容易忽略的角落與收尾狀態。' },
    ],
  },
  report: {
    label: '清潔成果',
    title: '乾淨，從細節開始',
    desc: '完整處理粉塵與邊角，交付乾淨空間。',
    list: [
      '地面、牆角、檯面粉塵徹底清除',
      '櫃體內部、五金縫隙細節到位',
      '玻璃、邊角收尾，達到可入住狀態',
    ],
    img: asset('assets/deep-clean/result-sample.svg'),
    imgAlt: '裝潢細清成果照（佔位圖）',
  },
}

export default function DeepCleanPage() {
  return <ServiceTemplate config={DEEP_CLEAN} />
}
