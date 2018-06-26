var Prism = require('prismjs');
var loadLanguages = require('prismjs/components/index.js');
loadLanguages(['yaml', 'markdown', 'php']);

const markdownConfig = {
  extend(config) {
    config.highlight = (code, lang) => {
      return `<pre class="language-${lang} fs-codeblock"><code class="language-${lang}">${Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)}</code></pre>`
    }
  },
  plugins: {
    attrs: require('markdown-it-attrs'),
    figures: [require('markdown-it-implicit-figures'), { figcaption: true }],
    video: require('markdown-it-video'),
    footnote: require('markdown-it-footnote')
  }
}

module.exports = {
  content: [
    // English
    ['en/blog', {
      page: '/blog/_blogpost',
      permalink: '/blog/:slug',
      toc: 1,
      data: { contentLocale: 'en' },
      markdown: markdownConfig
    }],
    ['en/showcase', {
      page: '/showcase/_showcase',
      permalink: '/showcase/:slug',
      data: { contentLocale: 'en' },
      markdown: markdownConfig
    }],
    ['en/docs', {
      page: '/docs/_page',
      permalink: '/docs/:section*/:slug',
      isPost: false,
      toc: 1,
      breadcrumbs: true,
      data: { contentLocale: 'en' },
      markdown: markdownConfig
    }],
    // German (Deutsch)
    ['de/blog', {
      page: '/de/blog/_blogpost',
      permalink: '/de/blog/:slug',
      toc: 1,
      data: { contentLocale: 'de' },
      markdown: markdownConfig
    }],
    ['de/showcase', {
      page: '/de/showcase/_showcase',
      permalink: '/de/showcase/:slug',
      isPost: true,
      data: { contentLocale: 'de' },
      markdown: markdownConfig
    }],
    ['de/docs', {
      page: '/de/docs/_page',
      permalink: '/de/docs/:section*/:slug',
      isPost: false,
      toc: 1,
      breadcrumbs: true,
      data: { contentLocale: 'de' },
      markdown: markdownConfig
    }],
    // Dutch (Nederlands)
    ['nl/blog', {
      page: '/nl/blog/_blogpost',
      permalink: '/nl/blog/:slug',
      toc: 1,
      data: { contentLocale: 'nl' },
      markdown: markdownConfig
    }],
    ['nl/showcase', {
      page: '/nl/showcase/_showcase',
      permalink: '/nl/showcase/:slug',
      isPost: true,
      data: { contentLocale: 'nl' },
      markdown: markdownConfig
    }],
    ['nl/docs', {
      page: '/nl/docs/_page',
      permalink: '/nl/docs/:section*/:slug',
      isPost: false,
      toc: 1,
      breadcrumbs: true,
      data: { contentLocale: 'nl' },
      markdown: markdownConfig
    }],
    // Spanish
    ['es/blog', {
      page: '/es/blog/_blogpost',
      permalink: '/es/blog/:slug',
      toc: 1,
      data: { contentLocale: 'es' },
      markdown: markdownConfig
    }],
    ['es/showcase', {
      page: '/es/showcase/_showcase',
      permalink: '/es/showcase/:slug',
      data: { contentLocale: 'es' },
      markdown: markdownConfig
    }],
    ['es/docs', {
      page: '/es/docs/_page',
      permalink: '/es/docs/:section*/:slug',
      isPost: false,
      toc: 1,
      breadcrumbs: true,
      data: { contentLocale: 'es' },
      markdown: markdownConfig
    }],
  ],
  api: {
    baseURL: 'http://localhost:3000',
    browserBaseURL: process.env.FS_SITE
  }
  }
