const markdownConfig = {
  plugins: {
    attrs: require('markdown-it-attrs'),
    figures: [require('markdown-it-implicit-figures'), { figcaption: true }],
    video: require('markdown-it-video')
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
  ],
  api: {
    baseURL: 'http://localhost:3000',
    browserBaseURL: process.env.FS_SITE
  }
  }
