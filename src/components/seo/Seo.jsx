import { Helmet } from 'react-helmet-async'
import { useCmsData } from '../../hooks/useCmsData'

// 逐頁 SEO：CMS 值 ?? fallback（fallback = 各頁原本 <Helmet> 的硬寫值）。
// 用法：<Seo routeKey="home" fallback={{ title, description, keywords, ogTitle, ogImage, jsonLd, ... }} />
export default function Seo({ routeKey, fallback = {}, locale = 'zh' }) {
  const cms = useCmsData(`/api/page-seo?routeKey=${encodeURIComponent(routeKey)}&locale=${locale}`)
  const v = { ...fallback, ...(cms || {}) }
  const ogTitle = v.ogTitle || v.title
  const ogDesc = v.ogDescription || v.description

  return (
    <Helmet>
      {v.title && <title>{v.title}</title>}
      {v.description && <meta name="description" content={v.description} />}
      {v.keywords && <meta name="keywords" content={v.keywords} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDesc && <meta property="og:description" content={ogDesc} />}
      {v.ogImage && <meta property="og:image" content={v.ogImage} />}
      <meta property="og:type" content={v.ogType || 'website'} />
      {v.noindex && <meta name="robots" content="noindex" />}
      {v.jsonLd && <script type="application/ld+json">{JSON.stringify(v.jsonLd)}</script>}
    </Helmet>
  )
}
