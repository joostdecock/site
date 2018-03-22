module.exports = {
  content: {
    page: '/blog/_post',
    permalink: '/blog/:slug',
    isPost: true,
    anchorLevel: 4,
    generate: [
        'get',
        'getAll'
    ]
  },
  api: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://v2.freesewing.org'
        : 'http://localhost:3000'
  }
}
