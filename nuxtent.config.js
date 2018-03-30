module.exports = {
  content: [
    // English
    ['en/blog', {
      page: '/blog/_blogpost',
      permalink: '/blog/:slug',
      isPost: true,
      toc: 1,
      data: { contentLocale: 'en' },
      generate: [
        'get',
        'getAll'
      ]
    }],
    //['en/showcase', {
    //  page: '/showcase/_showcase',
    //  permalink: '/showcase/:slug',
    //  isPost: true,
    //  anchorLevel: 4,
    //  data: { contentLocale: 'en' },
    //  generate: [
    //    'get',
    //    'getAll'
    //  ]
    //}],
    //['en/docs', {
    //  page: '/docs/_page',
    //  permalink: '/docs/:section*/:slug',
    //  isPost: false,
    //  anchorLevel: 4,
    //  data: { contentLocale: 'en' },
    //  breadcrumbs: true,
    //  toc: 3,
    //  generate: [
    //    'get',
    //    'getAll'
    //  ]
    //}],
    //// Dutch (Nederlands)
    //['nl/blog', {
    //  page: '/nl/blog/_blogpost',
    //  permalink: '/nl/blog/:slug',
    //  isPost: true,
    //  anchorLevel: 4,
    //  data: { contentLocale: 'nl' },
    //  generate: [
    //    'get',
    //    'getAll'
    //  ]
    //}],
    //['nl/showcase', {
    //  page: '/nl/showcase/_showcase',
    //  permalink: '/nl/showcase/:slug',
    //  isPost: true,
    //  anchorLevel: 4,
    //  data: { contentLocale: 'nl' },
    //  generate: [
    //    'get',
    //    'getAll'
    //  ]
    //}],
    //['nl/docs', {
    //  page: '/nl/docs/_page',
    //  permalink: '/nl/docs/:section*/:slug',
    //  isPost: false,
    //  anchorLevel: 4,
    //  data: { contentLocale: 'nl' },
    //  generate: [
    //    'get',
    //    'getAll'
    //  ]
    //}],
    ],
    api: {
      baseURL: 'http://localhost:3000',
      browserBaseURL: process.env.FREESEWING_BROWSER_BASE_URL
    }
}
