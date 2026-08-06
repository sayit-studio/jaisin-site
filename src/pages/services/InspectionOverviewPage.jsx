import {
  Droplets, ArrowDownToLine, Thermometer, Ruler, Zap, FileText,
  Home, Building, Building2,
} from 'lucide-react'
import ServiceTemplate from '../../components/sections/services/ServiceTemplate'
import { asset } from '../../config/site'

const INSPECTION = {
  routeKey: 'service-inspection',
  seo: {
    title: '專業驗屋｜什麼是驗屋、流程與報告 — 宅心驗屋專業驗屋公司',
    description: '宅心驗屋是專業驗屋公司，提供新成屋、中古屋、透天別墅與社區團購驗屋。100+ 項細節檢測、熱顯像儀器輔助、圖像化報告，讓你交屋有所依據。',
    keywords: '專業驗屋, 驗屋公司, 宅心驗屋, 驗屋流程, 驗屋報告, 熱顯像驗屋',
    ogImage: asset('assets/og/og-inspection.webp'),
  },
  banner: {
    desktop: asset('assets/banners/inspection-desktop.webp'),
    mobile: asset('assets/banners/inspection-mobile.webp'),
  },
  header: {
    eyebrow: '專業驗屋',
    title: '專業驗屋，看清真實屋況',
    desc: '儀器檢測、完整紀錄，留下交屋修繕依據。',
  },
  points: {
    label: '驗屋講解重點',
    title: '100+ 項專業檢測',
    sub: '系統性儀器輔助，逐項記錄，不靠印象判斷。',
    items: [
      { icon: Droplets, label: '窗框與門窗', desc: '密合度、防水嵌縫、開闔順暢與五金，雨天滲水的第一道關卡。' },
      { icon: ArrowDownToLine, label: '排水與管線', desc: '各區域排水坡度、水流測試與管線異常，降低入住後維修風險。' },
      { icon: Thermometer, label: '熱顯像檢測', desc: 'FLIR 熱顯像儀偵測牆面溫差，揭示潛在漏水與水氣累積。' },
      { icon: Ruler, label: '水平與結構', desc: '地板水平、牆面垂直、磁磚空鼓與批土龜裂，確認施工品質。' },
      { icon: Zap, label: '用電與安全', desc: '插座極性、接地、線路負載與弱電，電氣安全全面確認。' },
      { icon: FileText, label: '報告與溝通', desc: '照片、位置、建議完整成冊，每個發現都有清楚的交涉依據。' },
    ],
  },
  flow: {
    label: '驗屋流程',
    title: '五步驟完成驗屋',
    items: [
      { num: '01', title: 'LINE 諮詢', desc: '提供物件資訊、坪數與時程。' },
      { num: '02', title: '確認排程', desc: '確認日期、時段與服務範圍。' },
      { num: '03', title: '現場檢測', desc: '依項目逐區檢測與拍照紀錄。' },
      { num: '04', title: '完整報告', desc: '整理缺失照片、位置與說明。' },
      { num: '05', title: '報告說明', desc: '說明重點與後續交涉方向。' },
    ],
  },
  report: {
    label: '驗屋報告',
    title: '報告就是修繕依據',
    desc: '照片、位置與建議完整留存，方便修繕與複驗。',
    list: [
      '照片 + 標記說明，缺失一目了然',
      '逐項分類，方便整理交涉清單',
      'PDF 格式，可直接寄給建商或設計師',
    ],
    reveal: {
      beforeSrc: asset('assets/inspection/new-home-before-sample.png'),
      afterSrc: asset('assets/inspection/new-home-thermal-sample.png'),
      beforeLabel: '肉眼視覺',
      afterLabel: '熱顯像分析',
      beforeAlt: '一般檢測現場示意',
      afterAlt: '熱顯像檢測示意',
    },
  },
  houseLinks: {
    label: '依房型選擇',
    title: '依房型找到驗屋重點',
    items: [
      { icon: Home, title: '新成屋驗屋', desc: '交屋前的最後把關', to: '/services/new-home' },
      { icon: Building, title: '中古屋驗屋', desc: '買下前看清屋況', to: '/services/used-home' },
      { icon: Building2, title: '透天別墅驗屋', desc: '多樓層逐層把關', to: '/services/townhouse' },
    ],
  },
}

export default function InspectionOverviewPage() {
  return <ServiceTemplate config={INSPECTION} />
}
