const freesewingConfig = {
  api: {
    data: "https://joost.data.freesewing.org",
    content: "http://localhost:3000/content-api"
  }
}

module.exports = {
  srcDir: 'app/',
  env: {
    conf: freesewingConfig
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'site',
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
  /*
  ** Build configuration
  */
 modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/auth',
    'nuxtdown',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English'
        },
        {
          code: 'nl',
          iso: 'nl-NL',
          name: 'Nederlands'
        }
      ],
      defaultLocale: 'en',
      noPrefixDefaultLocale: true,
      vueI18n: {
        messages: {
            'en': require('./app/locales/en.json'),
            'nl': require('./app/locales/nl.json'),
        },
        fallbackLocale: 'en'
      },
    }
  ],
  ],
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
  axios: {
//      browserBaseURL: 'https://joost.data.freesewing.org'
  },
  auth: {
    strategies: {
      user: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: freesewingConfig.api.data+"/login",
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: freesewingConfig.api.data+"/account",
            method: 'get'
          }
        }
      }
    }
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        path: '/profile', 
        component: 'app/pages/dynamic/show-user-profile.vue'
      })
    }
  },
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
