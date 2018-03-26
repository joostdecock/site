const axios = require('axios');

module.exports = {
  srcDir: 'app/',
  subFolder: false,
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
      'nuxtent',
       '@nuxtjs/vuetify'
  ],
  plugins: ['~/plugins/i18n.js'],
  vuetify: {
    materialIcons: true,
    css: false,
    theme: {
      // This is Freesewing's signature purple
      primary: '#663F95', 
      secondary: '#455A64',
      warning: '#FFAB00',
      error: '#D32F2F',
      info: '#64B5F6',
      accent: '#FF5B77'
    }
  },
  css: [
      '~/assets/style/freesewing.styl'
  ],
  router: {
    middleware: 'i18n'
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
