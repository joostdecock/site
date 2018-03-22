const axios = require('axios');

module.exports = {
    srcDir: 'app/',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Freesewing.org v2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [ 
      'nuxtent'
  ],
  generate: {
    routes: function() {
        return axios.get('http://localhost:3000/content-api?')
            .then(response => {
                const routes = []
                for (const key in response.data ) {
                    routes.push(response.data[key].permalink)
                }
                return routes
            })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
