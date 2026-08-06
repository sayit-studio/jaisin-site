import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { SiteRoutes } from './App'
import { BASE } from './config/site'

export function render(pathname) {
  const helmetContext = {}
  const basePath = BASE.replace(/\/$/, '')
  let html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter basename={basePath} location={`${basePath}${pathname}`}>
        <SiteRoutes />
      </StaticRouter>
    </HelmetProvider>,
  )

  const headTags = []
  html = html.replace(
    /<(?:link|meta)\b[^>]*\/?\s*>|<title\b[^>]*>[\s\S]*?<\/title>|<script\b[^>]*type=.application\/ld\+json.[^>]*>[\s\S]*?<\/script>/gi,
    (tag) => {
      headTags.push(tag)
      return ''
    },
  )

  return { html, head: headTags.join('\n    ') }
}
