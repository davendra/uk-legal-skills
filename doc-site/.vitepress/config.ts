import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE || '/'
const siteUrl = 'https://ailegal.the-counsel.co.uk'
const socialImageUrl = `${siteUrl}/opengraph-image`

function canonicalPath(relativePath: string): string {
  if (relativePath === 'index.md') return base.replace(/\/$/, '')
  if (relativePath.endsWith('/index.md')) {
    return `${base}${relativePath.slice(0, -'index.md'.length)}`.replace(/\/$/, '')
  }
  return `${base}${relativePath.replace(/\.md$/, '')}`
}

function normalizeDocsLinks(code: string): string {
  return code.replace(
    /href="(\/docs-site(?:\/[^"#?]*)?)(\.html|\/)(#[^"]*)?"/g,
    (_match, path: string, _suffix: string, hash = '') => `href="${path}${hash}"`,
  )
}

export default defineConfig({
  appearance: true,
  cleanUrls: true,
  base,
  title: 'UK Legal Skills',
  description: 'Open-source legal skills for Claude Code, scoped to England & Wales. 38 skills, 12 agents, MCP servers over the entirety of E&W statute and caselaw.',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}the-counsel-logo.svg` }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['meta', { name: 'theme-color', content: '#8b1f1f' }],
  ],
  transformHead({ pageData }) {
    const canonical = new URL(canonicalPath(pageData.relativePath), siteUrl).href
    const title = pageData.title
      ? `${pageData.title} · UK Legal Skills`
      : 'UK Legal Skills'
    const description = pageData.description || 'Open-source legal skills for Claude Code, scoped to England & Wales. 38 skills, 12 agents, MCP servers over the entirety of E&W statute and caselaw.'

    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'UK Legal Skills' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:image', content: socialImageUrl }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: socialImageUrl }],
    ]
  },
  transformHtml(code) {
    return normalizeDocsLinks(code).replace(
      '<div class="VPContent is-home" id="VPContent"',
      '<div class="VPContent is-home" id="VPContent" role="main"',
    )
  },
  ignoreDeadLinks: [
    /localhost/,
  ],
  themeConfig: {
    logo: '/the-counsel-logo.svg',
    siteTitle: 'UK Legal Skills',

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    nav: [
      { text: 'Guide', link: '/getting-started/' },
      { text: 'CLI Commands', link: '/cli/' },
      {
        text: 'More',
        items: [
          { text: 'MCP Servers', link: '/mcp/' },
          { text: 'Concepts', link: '/concepts/how-it-works' },
          { text: 'Architecture', link: '/architecture/' },
          { text: 'Contributing', link: '/contributing/' },
          { text: 'Reference', link: '/reference/all-commands' },
        ],
      },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/getting-started/' },
            { text: 'Requirements', link: '/getting-started/requirements' },
            { text: 'Installation', link: '/getting-started/installation' },
            { text: 'Quick Start', link: '/getting-started/quick-start' },
          ],
        },
      ],

      '/cli/': [
        {
          text: 'CLI Commands',
          items: [
            { text: 'Overview', link: '/cli/' },
            { text: 'Contract Analysis', link: '/cli/contract-analysis' },
            { text: 'Employment & IR35', link: '/cli/employment' },
            { text: 'Corporate & AML', link: '/cli/corporate' },
            { text: 'Property & Tenancy', link: '/cli/property' },
            { text: 'Compliance & GDPR', link: '/cli/compliance' },
            { text: 'Document Generation', link: '/cli/document-generation' },
            { text: 'Specialist', link: '/cli/specialist' },
            { text: 'Utilities', link: '/cli/utilities' },
          ],
        },
      ],

      '/mcp/': [
        {
          text: 'MCP Servers',
          items: [
            { text: 'What is MCP?', link: '/mcp/' },
            { text: 'UK Legislation Server', link: '/mcp/uk-legislation' },
            { text: 'Lex Court Cases', link: '/mcp/lex-server' },
          ],
        },
      ],

      '/concepts/': [
        {
          text: 'Concepts',
          items: [
            { text: 'How It Works', link: '/concepts/how-it-works' },
            { text: 'Jurisdiction', link: '/concepts/jurisdiction' },
            { text: 'Risk Scoring', link: '/concepts/risk-scoring' },
            { text: 'Disclaimer & Limitations', link: '/concepts/disclaimer' },
          ],
        },
      ],

      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'Skills System', link: '/architecture/skills-system' },
            { text: 'Agent Orchestration', link: '/architecture/agents' },
            { text: 'MCP Server Internals', link: '/architecture/mcp-server' },
          ],
        },
      ],

      '/contributing/': [
        {
          text: 'Contributing',
          items: [
            { text: 'How to Contribute', link: '/contributing/' },
            { text: 'Adding Skills', link: '/contributing/adding-skills' },
            { text: 'Adding Agents', link: '/contributing/adding-agents' },
            { text: 'Coding Standards', link: '/contributing/coding-standards' },
          ],
        },
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'All Commands', link: '/reference/all-commands' },
            { text: 'UK Legislation', link: '/reference/legislation' },
            { text: 'File Naming', link: '/reference/file-naming' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/davendra/uk-legal-skills' },
    ],

    footer: {
      message: 'UK Legal Skills — Established MMXXVI · Built for England & Wales · Not legal advice.',
      copyright: 'Open source under MIT Licence',
    },

    editLink: {
      pattern: 'https://github.com/davendra/uk-legal-skills/edit/main/doc-site/:path',
      text: 'Edit this page on GitHub',
    },
  },
})
