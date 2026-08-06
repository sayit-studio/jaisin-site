import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(rootDir, 'dist')
const serverDir = path.join(rootDir, '.prerender')
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')))

const routes = [
  '/',
  '/about',
  '/seminar',
  '/services/inspection',
  '/services/new-home',
  '/services/used-home',
  '/services/townhouse',
  '/services/group',
  '/services/deep-clean',
  '/services/renovation',
  '/faq',
  '/privacy',
  '/contact-enterprise',
  '/404',
]

function applyHead(html, head) {
  if (!head) return html

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta name=.description.[^>]*>/i, '')
    .replace('</head>', `    ${head}\n  </head>`)
}

for (const route of routes) {
  const rendered = render(route)
  if (!rendered.html.includes('<h1')) {
    throw new Error(`Prerender produced no page content for ${route}`)
  }
  const html = applyHead(template, rendered.head)
    .replace(/<div id=.root.><\/div>/, `<div id=root>${rendered.html}</div>`)
  const outputDir = route === '/' ? distDir : path.join(distDir, route.slice(1))

  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(path.join(outputDir, 'index.html'), html)
}

const siteOrigin = (process.env.VITE_SITE_ORIGIN || '').replace(/\/+$/, '')
if (siteOrigin) {
  const publicRoutes = routes.filter((route) => route !== '/404')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes.map((route) => `  <url><loc>${siteOrigin}${route === '/' ? '/' : `${route}/`}</loc></url>`).join('\n')}
</urlset>
`
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap)
  await fs.writeFile(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`)
}

await fs.rm(serverDir, { recursive: true, force: true })
console.log(`Prerendered ${routes.length} routes (booking excluded).`)
