import { ClipboardList, Home, Hammer, ShieldCheck } from 'lucide-react'
import ServiceTemplate from '../../components/sections/services/ServiceTemplate'
import { asset } from '../../config/site'

const RENOVATION = {
  routeKey: 'service-renovation',
  seo: {
    title: '全屋整裝｜從屋況到入住的整合規劃 — 宅心驗屋',
    description: '宅心驗屋提供全屋整裝規劃服務，協助屋主從屋況確認、空間需求、工程整合到品質把關，降低裝修溝通成本。',
  },
  banner: {
    desktop: asset('assets/banners/renovation-desktop.webp'),
    mobile: asset('assets/banners/renovation-mobile.webp'),
  },
  header: {
    eyebrow: '全屋整裝',
    title: '放心，從交給對的人開始',
    desc: '一站式服務：規劃、施工、驗收',
  },
  points: {
    label: '服務重點',
    title: '全屋整裝四大重點',
    items: [
      { icon: ClipboardList, label: '需求盤點', desc: '釐清屋況、生活需求、預算與施工優先順序。' },
      { icon: Home, label: '空間規劃', desc: '整合格局、收納、機能與入住節奏，建立清楚方向。' },
      { icon: Hammer, label: '工程整合', desc: '協助整合施工項目與現場溝通，降低多窗口落差。' },
      { icon: ShieldCheck, label: '品質把關', desc: '從驗屋視角協助檢視施工細節與交付品質。' },
    ],
  },
  flow: {
    label: '整裝流程',
    title: '四階段完成整裝',
    items: [
      { num: '01', title: '屋況確認', desc: '先掌握屋況真實狀態，作為整裝規劃的基礎。' },
      { num: '02', title: '需求規劃', desc: '盤點生活需求、預算與空間方向，建立清楚藍圖。' },
      { num: '03', title: '工程整合', desc: '整合施工項目與現場溝通，降低多窗口協調成本。' },
      { num: '04', title: '品質驗收', desc: '從驗屋視角檢視施工細節與交付品質。' },
    ],
  },
  report: {
    label: '整裝成果',
    title: '讓空間真正適合生活',
    desc: '整合空間機能與品質，打造理想生活。',
    list: [
      '格局與機能重新整合',
      '工程品質從驗屋視角把關',
      '一個窗口整合，降低溝通成本',
    ],
    img: asset('assets/renovation/result-sample.svg'),
    imgAlt: '全屋整裝成果照（佔位圖）',
  },
}

export default function RenovationPage() {
  return <ServiceTemplate config={RENOVATION} />
}
