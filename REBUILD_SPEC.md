# 宅心驗屋 new-site 全站重整規格（REBUILD_SPEC）

> 一次性改動藍圖。技術棧：React 19 + Vite + react-router-dom 7 + GSAP/ScrollTrigger + Lenis + lucide-react。
> 動畫鐵則：進場 `once: true` 只播一次；尊重 `prefers-reduced-motion`；無邊框設計；統一中英雙標題。

---

## 一、首頁 HomePage 區塊規格

| # | 區塊 | 定稿方案 | 動畫 | 素材 |
|---|---|---|---|---|
| 1 | Hero | 沿用 3 張輪播 Banner ＋ bounce 錨點下滑鈕「往下看服務↓」 | 下滑鈕 `y:[0,8,0]` 無限 bounce | 無文字版背景圖（可選） |
| 1b | 快捷入口 QuickAccess | 手機 2×3 宮格／桌機橫向快捷列，6 入口：立即預約·驗屋報價·新成屋·社區團購·說明會·常見問題 | fade-up stagger 0.06s | lucide icon |
| 2 | 需求情境 | 痛點卡片牆（3 欄/2×3，大編號浮水印、無邊框柔陰影） | stagger ＋ hover translateY(-6px) | — |
| 3 | 房屋類型切換器 | Tab：新成屋／中古屋／透天，config-driven，CTA 導三房型頁 | 底線 translateX 0.3s ＋ 內容交叉淡入 | 3 張房型 Banner |
| 4 | 驗屋流程 | Step 標籤列 ＋ 手機 mockup 截圖連動 | 點 Step 截圖交叉淡入 | 5 張流程實況圖 |
| 5 | 檢測項目（深色） | 「130+」count-up ＋ 6 大類別卡（子項數，hover 細項），保留光環 | count-up 0→130 1.2s ＋ stagger | — |
| 6 | 科技設備 | 熱顯像 Before/After 滑桿主秀（複用 BeforeAfterReveal）＋ 4 儀器小卡 | 拖曳滑桿 ＋ stagger | 沿用現有熱顯像圖 |
| 7 | 媒體報導 | 橫向輪播帶（scroll-snap，露 3.5 張） | 橫滑 | 沿用 media-logo |
| 8 | 屋主評價 | 雙排反向無限跑馬燈（hover 暫停） | 上排左移／下排右移無限捲 | 可多則 |
| 9 | FAQ | 精選 5 題手風琴 ＋「看更多→」導 /faq | maxHeight 展開 | 完整題庫 |
| 10 | 結尾收束 | FAQ 後加 CtaBannerSection | 脈動裝飾 | — |
| — | 全站浮動 | 側邊懸浮 LINE CTA（滾過 Hero 滑入）＋ 回頂鈕 | useScroll 判斷滑入 | — |

## 二、網站結構（IA）/ Navbar

```
驗屋類型 ▾  新成屋驗屋 /services/new-home · 中古屋驗屋 /services/used-home · 透天別墅驗屋 /services/townhouse ★新增
服務項目 ▾  專業驗屋（驗屋總覽頁）/services/inspection · 裝潢細清 /services/deep-clean · 全屋整裝 /services/renovation
社區團購    /services/group（獨立 top-level）
關於宅心 /about · 驗屋說明會 /seminar · 常見問題 /faq ★新增
```

## 三、分頁規格

| 頁面 | 路由 | 處理 |
|---|---|---|
| 驗屋總覽 Hub | /services/inspection | 改寫：價值→130+項→儀器滑桿→流程→報告→三房型分流入口→FAQ→CTA |
| 新成屋驗屋 | /services/new-home | 套房型模板（基準頁） |
| 中古屋驗屋 | /services/used-home | 套模板，補熱顯像對比圖 |
| 透天別墅驗屋 | /services/townhouse | ★新建，文案擬寫、圖 placeholder |
| 裝潢細清 | /services/deep-clean | 補強：重點卡→前後對比→情境→FAQ→CTA |
| 全屋整裝 | /services/renovation | 補強：整合面向→流程→案例對比→FAQ→CTA |
| 社區團購 | /services/group | 維持 ＋ 進場動畫 |
| 關於宅心 | /about | 維持 ＋ 動畫 |
| 驗屋說明會 | /seminar | 維持 ＋ 動畫（n8n webhook 待接） |
| 企業合作 | /contact-enterprise | 維持 |
| 常見問題 | /faq | ★新建：分類 Tab ＋ Q 編號 ＋ 手風琴 |
| 全站 | — | 所有分頁掛 ScrollTrigger 進場動畫 |

## 四、房型頁統一模板

```
① PageHeader（房型專屬大標 + 副標）
② 該房型常見缺失/檢查重點（6 卡網格）
③ 熱顯像 Before/After 滑桿（複用 BeforeAfterReveal）
④ 該房型驗屋時機 or 重點（3~4 卡）
⑤ 驗屋流程（精簡版 4 步）
⑥ 報告說明（左圖右文 + 清單）
⑦ 房型專屬 FAQ（手風琴）
⑧ CtaBannerSection
＋ 全頁掛 ScrollTrigger 進場動畫
```

## 五、清理
移除未使用元件 `TrustStatsSection`、`ServiceHero`（確認無引用後）。

---

## 六、素材需求清單

標記：🤖 可 AI 生圖｜📷 建議真實照片／截圖｜♻️ 站上已有可沿用

### A. Hero 快捷 icon ×6 ♻️ 用 lucide
立即預約=MessageCircle、驗屋報價=Calculator、新成屋=Home、社區團購=Users、說明會=CalendarDays、常見問題=HelpCircle

### B. 房型 Banner ×3 🤖（桌機 1600×900／手機 1080×1350，去文字、左側留文字安全區）
- 新成屋：Bright modern new Taiwanese apartment interior, empty handed-over room, large windows, clean white walls, soft daylight, navy/gold accent, left negative space, no text, photorealistic
- 中古屋：Lived-in older Taiwanese apartment interior, subtle age signs on walls/ceiling, warm honest lighting, documentary style, navy/gold grade, left negative space, no text, photorealistic
- 透天別墅：Taiwanese three-story townhouse exterior and stairwell, multi-level, rooftop/facade visible, clean architectural photo, blue sky, navy/gold accent, left negative space, no text, photorealistic

### C. 驗屋流程實況圖 ×5 📷（裝手機 mockup，直式 1080×1920）
01 LINE 諮詢截圖 / 02 排程確認 / 03 現場檢測工作照 / 04 報告 PDF 截圖 / 05 報告說明場景

### D. 熱顯像 Before/After 對比 📷
首頁/總覽頁 ♻️ 沿用現有；中古屋頁 📷 補一組；透天頁先 placeholder

### E. 細清/整裝 前後對比 📷
細清：施工後粉塵 vs 細清後；整裝：整裝前 vs 整裝後成果

### F. 其他
媒體 logo ♻️ 已有；評價頭像 ♻️ placeholder；社區 logo ♻️ LogoLoop placeholder

### 優先順序
1. 房型 Banner ×3、中古屋熱顯像對比
2. 流程 5 圖
3. 細清/整裝前後、透天熱顯像、社區/頭像（先 placeholder 不擋上線）
