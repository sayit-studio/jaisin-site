import Seo from '../components/seo/Seo'
import './PrivacyPage.css'
import { asset } from '../config/site'

const LINE_URL = 'https://line.me/R/ti/p/@301thssm'

export default function PrivacyPage() {
  return (
    <>
      <Seo routeKey="privacy" fallback={{
        title: '隱私政策 — 宅心驗屋',
        description: '宅心驗屋個人資料保護政策，說明我們如何收集、使用與保護您的個人資料。',
        ogImage: asset('assets/og/og-default.jpg'),
      }} />

      <div className="privacy-page">
        <div className="container privacy-page__inner">
          <div className="privacy-page__header">
            <h1 className="text-h1">隱私權政策</h1>
            <p className="privacy-page__updated">最後更新：2025 年 1 月 1 日</p>
          </div>

          <div className="privacy-content">
            <section className="privacy-section">
              <h2>第一條：個資收集範圍</h2>
              <p>宅心驗屋（以下簡稱「本公司」）透過以下表單收集個人資料：</p>
              <ul>
                <li><strong>驗屋說明會報名表單：</strong>姓名、電話、LINE ID、物件地區、場次選擇、問題描述</li>
                <li><strong>企業合作表單：</strong>公司名稱、聯絡人、職稱、電話、Email、需求描述</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>第二條：收集目的</h2>
              <ul>
                <li>安排驗屋說明會場次與聯絡確認</li>
                <li>企業合作服務洽詢與報價</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>第三條：資料使用方式</h2>
              <ul>
                <li>本公司僅將個人資料用於上述服務目的</li>
                <li>不將個人資料出售、租借或無償提供給任何第三方</li>
                <li>如有法律義務需配合，依法辦理</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>第四條：資料保存期限</h2>
              <ul>
                <li><strong>說明會報名資料：</strong>活動結束後 6 個月</li>
                <li><strong>企業合作洽詢資料：</strong>服務結束後 1 年</li>
                <li>屆期後自動刪除或匿名化處理</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>第五條：您的權利</h2>
              <p>依個人資料保護法，您對本公司保有之個人資料擁有以下權利：</p>
              <ul>
                <li>查詢、閱覽、複製個人資料</li>
                <li>更正或補充個人資料</li>
                <li>停止收集、處理或利用個人資料</li>
              </ul>
              <p>請透過 LINE OA 提出申請，我們將在合理期間內處理您的請求。</p>
            </section>

            <section className="privacy-section">
              <h2>第六條：聯繫我們</h2>
              <p>
                如有任何隱私相關問題，請透過 LINE OA 聯繫宅心驗屋：
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="privacy-link">
                  @301thssm
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
