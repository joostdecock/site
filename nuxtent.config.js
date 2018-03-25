module.exports = {
    content: [
        // English
        ['blog', {
            page: '/blog/_post',
            permalink: '/blog/:slug',
            isPost: true,
            anchorLevel: 4,
            generate: [
                'get',
                'getAll'
            ]
        }],
        ['showcase', {
            page: '/showcase/_showcase',
            permalink: '/showcase/:slug',
            isPost: true,
            anchorLevel: 4,
            generate: [
                'get',
                'getAll'
            ]
        }],
        ['pages', {
            page: '/_page',
            permalink: ':section*/:slug',
            isPost: false,
            anchorLevel: 4,
            generate: [
                'get',
                'getAll'
            ]
        }],
        // Dutch (Nederlands)
        ['nl/blog', {
            page: '/nl/blog/_post',
            permalink: '/blog/:slug',
            isPost: true,
            anchorLevel: 4,
            generate: [
                'get',
                'getAll'
            ]
        }],
        ['nl/showcase', {
            page: '/nl/showcase/_showcase',
            permalink: '/showcase/:slug',
            isPost: true,
            anchorLevel: 4,
            generate: [
                'get',
                'getAll'
            ]
        }],
        ['nl/pages', {
            page: '/nl/_page',
            permalink: ':section*/:slug',
            isPost: false,
            anchorLevel: 4,
            generate: [
                'get',
                'getAll'
            ]
        }],
    ],
    api: {
        baseURL: 'http://localhost:3000',
        browserBaseURL: process.env.FREESEWING_BROWSER_BASE_URL
    }
}
