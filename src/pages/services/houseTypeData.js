import {
  Droplets, ArrowDownToLine, Thermometer, Zap, Layers, AlignJustify,
  Cable, Square, Eye, Building2, Mountain, Waves, Wind, Ruler,
} from 'lucide-react'
import { asset } from '../../config/site'

export const NEW_HOME = {
  routeKey: 'service-new-home',
  seo: {
    title: '台中新成屋驗屋｜專業驗屋公司宅心驗屋 — 交屋前的最後把關',
    description: '宅心驗屋提供台中新成屋驗屋服務，由專業驗屋公司執行窗框防水、泄水坡度、熱顯像、用電等項目全面檢測，圖像化報告讓你與建商交涉有所依據。',
    keywords: '台中新成屋驗屋, 新成屋驗屋, 專業驗屋公司, 宅心驗屋, 驗屋推薦, 交屋驗屋',
    ogImage: asset('assets/og/og-new-home.jpg'),
  },
  banner: {
    desktop: asset('assets/banners/new-home-desktop.webp'),
    mobile: asset('assets/banners/new-home-mobile.webp'),
  },
  header: {
    eyebrow: '新成屋驗屋｜專業驗屋公司',
    title: '把關最後一哩路',
    desc: '交屋前完整檢測，把關新家的每一份用心',
  },
  intro: {
    label: '新成屋驗屋重點',
    title: '新成屋六大檢查重點',
    sub: '看似嶄新的房子，這些問題仍然非常普遍。',
    items: [
      { icon: Droplets, label: '窗框防水不良', desc: '滲、漏、含水率異常風險' },
      { icon: ArrowDownToLine, label: '地板泄水坡度不足', desc: '陽台、淋浴區積水隱患' },
      { icon: Thermometer, label: '牆面溫差異常', desc: '潛在漏水或隔熱問題' },
      { icon: Zap, label: '電氣插座線路問題', desc: '接地、極性或負載異常' },
      { icon: Layers, label: '牆面龜裂與批土不平整', desc: '結構沉降或施工品質問題' },
      { icon: AlignJustify, label: '天花板接縫脫落', desc: '接縫開裂、批土脫落與板材錯位' },
    ],
  },
  compare: {
    label: '方案比較',
    title: '專業差異，一次看懂',
    sub: '同樣是交屋前把關，不同服務的檢測深度與費用差很大。',
    tables: [
      {
        columns: ['宅心驗屋', '驗屋品牌', '水電公司'],
        highlight: 0,
        badge: '推薦',
        rows: [
          { label: '檢測項目', values: ['100+ 項・六大類', '依方案 50~100 項', '僅水電與設備'] },
          { label: '熱顯像儀器', values: ['✓ FLIR 全室', '部分配備', '✗'] },
          { label: '圖像化報告', values: ['✓ PDF 完整成冊', '簡易報告', '口頭告知'] },
          { label: '交屋交涉依據', values: ['✓ 照片＋位置標記', '視公司而定', '無'] },
          { label: '收費（每坪）', values: ['NT$600 起', 'NT$600~800', '無標準・多附帶'] },
          { label: '複驗', values: ['可安排', '另計 4,000~5,000/次', '通常無'] },
        ],
      },
    ],
    note: '※ 以上價格為 2025 市場行情草稿（鴻宇、奇尚、高澄等公開資料），實際報價以宅心評估為準。',
  },
  faq: {
    title: '新成屋屋主常問的問題',
    items: [
      { q: '交屋前多久安排驗屋比較合適？', a: '建議在驗屋日前 1 至 2 個月聯繫，讓我們有時間安排排程，也讓你在驗屋後有足夠時間與建商溝通修繕。如果交屋時程緊迫，請透過 LINE 說明，我們會盡力配合。' },
      { q: '驗屋後建商不願意修繕怎麼辦？', a: '宅心的報告提供明確的缺失位置、照片記錄與問題說明，是你與建商溝通最有力的書面依據。實際交涉由屋主主導，我們在驗屋當天現場解說時會協助你理解哪些問題屬於建商應修繕範圍，讓你開口有底氣。' },
      { q: '新成屋驗屋會檢查哪些項目？', a: '主要包含：窗框與衛浴灑水測試、各區域排水與泄水坡度、全室地排內視鏡檢測、衛浴與廚房設備五金檢驗、熱顯像牆面與天花板溫差、電氣插座極性與接地、牆面批土與龜裂、天花板接縫，以及門窗開闔順暢度等項目。完整清單可於驗屋前確認。' },
      { q: '可以在點交當天才叫驗屋嗎？', a: '不建議。建商通常會安排一段驗屋區間，驗屋必須在這段期間內完成；點交當天時間非常緊迫，且建商代表在場，現場壓力較大。建議在驗屋區間內提前安排，讓你在點交前已有完整的缺失清單，到點交當天只需確認修繕承諾即可，不需要臨時判斷。' },
    ],
  },
  cases: {
    label: '案例分享',
    title: '新成屋案例',
    sub: '以下為示意案例，實際內容依現場屋況而定。',
    items: [
      { tag: '窗框防水', meta: '台中西屯・新成屋', title: '窗框嵌縫不實，雨後滲水', desc: '熱顯像於窗周發現溫差異常，經含水率與滲漏跡象複測後記錄存證，協助屋主於點交前向建商反映。', img: asset('assets/cases/new-home-01.webp') },
      { tag: '泄水坡度', meta: '台中北屯・新成屋', title: '浴室排水逆坡積水', desc: '灑水測試發現淋浴區排水逆坡，水往門口流。記錄完整後建商重新施作泄水坡。', img: asset('assets/cases/new-home-02.webp') },
      { tag: '牆面龜裂', meta: '桃園中壢・新成屋', title: '客廳牆面批土龜裂', desc: '多處牆面批土龜裂與不平整，逐一標記位置與照片，納入交屋缺失清單。', img: asset('assets/cases/new-home-03.webp') },
    ],
  },
}

export const USED_HOME = {
  routeKey: 'service-used-home',
  seo: {
    title: '中古屋驗屋服務｜入住前，了解真實屋況 — 宅心驗屋',
    description: '宅心驗屋中古屋服務，協助看屋、議價或簽約前確認屋況。檢視漏水痕跡、管線、用電、排水與牆地狀態，提供可觀察與可檢測的屋況線索。',
    ogImage: asset('assets/og/og-used-home.jpg'),
  },
  banner: {
    desktop: asset('assets/banners/used-home-desktop.webp'),
    mobile: asset('assets/banners/used-home-mobile.webp'),
  },
  header: {
    eyebrow: '中古屋驗屋',
    title: '入住前，了解真實屋況',
    desc: '檢查漏水、管線、用電，讓決定更有依據',
  },
  intro: {
    label: '中古屋檢測重點',
    title: '中古屋六大檢查重點',
    sub: '以可見與可檢測範圍為主，誠實說明限制，不做過度承諾。',
    items: [
      { icon: Droplets, label: '漏水與潮濕痕跡', desc: '天花板、牆面、衛浴的水漬與壁癌' },
      { icon: Cable, label: '泄水坡度與管線狀態', desc: '老舊管線與排水不順的潛在問題' },
      { icon: Zap, label: '電氣線路老化風險', desc: '插座極性、接地與線路負載確認' },
      { icon: Square, label: '牆面、地板結構狀態', desc: '龜裂、空心、沉降等結構跡象' },
      { icon: Thermometer, label: '熱顯像輔助偵測', desc: '溫差異常揭示肉眼難以判斷的水氣' },
      { icon: Eye, label: '可觀察範圍聲明', desc: '以可見與可檢測範圍為主，誠實說明限制' },
    ],
  },
  compare: {
    label: '方案比較',
    title: '驗屋標準，一次看懂',
    sub: '中古屋屋況複雜，不同服務的檢測深度落差很大。',
    tables: [
      {
        columns: ['宅心驗屋', '驗屋品牌', '水電公司'],
        highlight: 0,
        badge: '推薦',
        rows: [
          { label: '漏水・壁癌判讀', values: ['✓ 熱顯像＋水分儀', '部分', '肉眼為主'] },
          { label: '管線老化評估', values: ['✓ 逐區檢測', '部分', '限可見範圍'] },
          { label: '用電安全', values: ['✓ 極性／接地／負載', '部分', '基本通電'] },
          { label: '屋況報告', values: ['✓ PDF 成冊', '簡易報告', '口頭告知'] },
          { label: '可作議價依據', values: ['✓ 完整紀錄', '視公司而定', '✗'] },
        ],
      },
    ],
  },
  faq: {
    title: '中古屋屋主常問的問題',
    items: [
      { q: '看屋當下可以請驗屋師一起去嗎？', a: '可以。如果你已有意向的物件，可以安排驗屋師在看屋或議價前到場，協助你在做決定前先掌握屋況。請透過 LINE 提供物件地址與看屋時程，我們協助安排。' },
      { q: '中古屋驗屋能保證找出所有問題嗎？', a: '宅心的服務範圍為可觀察與可檢測的屋況線索，包含可見的壁癌、漏水痕跡、坡度異常、插座電氣問題、熱顯像異常等。對於藏在牆內、天花板夾層或地板下方未開挖的管線，我們無法做出保證性判斷，相關限制會在報告中如實說明。' },
      { q: '什麼時候驗屋最有價值？', a: '議價前驗屋可作為議價籌碼；簽約前可確認問題範圍；簽約後入住前可建立初始屋況紀錄。不同時機各有價值，可依你的狀況安排。' },
      { q: '賣方不讓我在買賣前驗屋怎麼辦？', a: '合理的賣方通常願意配合屋況確認。若賣方拒絕驗屋，這本身就是一個值得注意的訊號。建議你在合約條件中加入屋況確認條款，或在簽約後入住前安排驗屋，建立初始屋況紀錄。' },
    ],
  },
  cases: {
    label: '案例分享',
    title: '中古屋案例',
    sub: '以下為示意案例，實際內容依現場屋況而定。',
    items: [
      { tag: '天花板漏水', meta: '台中北屯・中古屋', title: '天花板水漬，熱顯像確認滲水', desc: '客廳天花板可見水漬，熱顯像揭示樓上管線滲水路徑，作為議價依據。', img: asset('assets/cases/used-home-01.webp') },
      { tag: '管線老化', meta: '台中南區・中古屋', title: '排水不順與老舊管線', desc: '多處排水緩慢，記錄管線老化狀態，提醒屋主入住前評估更換。', img: asset('assets/cases/used-home-02.webp') },
      { tag: '壁癌潮濕', meta: '台中西區・中古屋', title: '臥室外牆壁癌', desc: '外牆壁癌與粉化，溫差異常顯示長期潮濕，協助屋主掌握屋況真實狀態。', img: asset('assets/cases/used-home-03.webp') },
    ],
  },
}

export const TOWNHOUSE = {
  routeKey: 'service-townhouse',
  seo: {
    title: '透天別墅驗屋｜多樓層逐層把關 — 宅心驗屋專業驗屋公司',
    description: '宅心驗屋提供透天別墅驗屋服務。頂樓防水、外牆滲水、各層管線與結構安全，多樓層多系統逐層檢測，熱顯像儀器輔助，報告完整可作為交涉依據。',
    keywords: '透天驗屋, 別墅驗屋, 透天別墅驗屋, 專業驗屋公司, 宅心驗屋, 頂樓防水',
    ogImage: asset('assets/og/og-townhouse.webp'),
  },
  banner: {
    desktop: asset('assets/banners/townhouse-desktop.webp'),
    mobile: asset('assets/banners/townhouse-mobile.webp'),
  },
  header: {
    eyebrow: '透天別墅驗屋',
    title: '透天驗屋更全面',
    desc: '逐層把關守護全家人的生活',
  },
  intro: {
    label: '透天檢測重點',
    title: '透天六大檢查重點',
    sub: '樓層多、系統獨立，這些是透天最容易被忽略的地方。',
    items: [
      { icon: Mountain, label: '頂樓防水與排水', desc: '頂樓是滲水第一道關卡，需確認防水層與泄水坡度' },
      { icon: Building2, label: '外牆滲水與磁磚', desc: '外牆裂縫、磁磚空鼓與滲水痕跡，影響整棟結構' },
      { icon: Waves, label: '各層給排水管線', desc: '多樓層管線走向複雜，逐層確認水流與漏水風險' },
      { icon: Zap, label: '全棟電氣與弱電', desc: '各層配電、總開關負載與弱電配置安全確認' },
      { icon: Ruler, label: '樓梯與結構安全', desc: '樓梯踏面、扶手與梁柱龜裂等結構性檢視' },
      { icon: Wind, label: '通風與採光死角', desc: '透天易有通風不良、潮濕死角，影響居住品質' },
    ],
  },
  compare: {
    label: '方案比較',
    title: '透天驗屋，完整最重要',
    sub: '透天樓層多、系統獨立，檢測涵蓋範圍與報價方式差異很大。',
    tables: [
      {
        columns: ['宅心驗屋', '驗屋品牌', '水電公司'],
        highlight: 0,
        badge: '推薦',
        rows: [
          { label: '樓層涵蓋', values: ['逐層＋頂樓外牆', '視範圍加價', '單點維修'] },
          { label: '頂樓防水／排水', values: ['✓', '部分', '✗'] },
          { label: '外牆滲水檢測', values: ['✓ 熱顯像輔助', '部分', '✗'] },
          { label: '逐層給排水', values: ['✓', '部分', '僅報修點'] },
          { label: '結構性檢視', values: ['✓ 可觀察範圍', '部分', '✗'] },
          { label: '收費方式', values: ['整案透明報價', 'NT$15,000 起・不一', '計次報價'] },
        ],
      },
    ],
    note: '※ 以上為 2025 市場行情草稿（鴻宇、奇尚、高澄等公開資料），透天多依樓層坪數整案估價，實際報價以宅心評估為準。',
  },
  faq: {
    title: '透天別墅屋主常問的問題',
    items: [
      { q: '透天驗屋需要多久時間？', a: '透天因樓層多、檢測範圍廣，所需時間通常比一般公寓長，依樓層數與坪數可能需要半天以上。實際時間請透過 LINE 提供物件資訊，我們協助評估。' },
      { q: '頂樓和外牆也會一起檢查嗎？', a: '會。頂樓防水、泄水坡度與外牆滲水是透天檢測的重點項目，我們會在可觀察與可安全到達的範圍內逐項確認，並以熱顯像輔助判斷。' },
      { q: '透天的結構安全也能檢測嗎？', a: '我們會就可觀察範圍檢視樓梯、梁柱與牆面的龜裂等結構性線索並如實記錄。但結構安全的正式鑑定需由結構技師執行，若發現重大疑慮，我們會建議你進一步委託專業鑑定。' },
      { q: '老透天和新透天的檢測重點一樣嗎？', a: '重點軸相同（防水、管線、電氣、結構），但老透天更著重管線老化、壁癌與結構沉降；新透天則著重施工品質與防水細節。我們會依屋況調整檢測重點。' },
    ],
  },
  cases: {
    label: '案例分享',
    title: '透天案例',
    sub: '以下為示意案例，實際內容依現場屋況而定。',
    items: [
      { tag: '頂樓防水', meta: '台中太平・透天', title: '頂樓防水層老化滲水', desc: '頂樓多處積水痕跡，熱顯像確認防水層失效範圍，建議重做防水。', img: asset('assets/cases/townhouse-01.webp') },
      { tag: '外牆滲水', meta: '台中大里・透天', title: '外牆磁磚空鼓與裂縫', desc: '敲擊與熱顯像檢測外牆空鼓區域，記錄裂縫位置，提醒滲水與剝落風險。', img: asset('assets/cases/townhouse-02.webp') },
      { tag: '各層管線', meta: '彰化員林・透天', title: '三樓衛浴排水滲至二樓', desc: '逐層檢測發現三樓衛浴防水不良，水氣滲至二樓天花板，完整記錄交涉。', img: asset('assets/cases/townhouse-03.webp') },
    ],
  },
}
