const freesewingConfig = {
  api: {
    data: "https://joost.data.freesewing.org",
    content: "http://localhost:3000/content-api"
  }
}

module.exports = {
  srcDir: 'nuxt/',
  env: {
    conf: freesewingConfig
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Freesewing.org',
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
          'en': require('./nuxt/locales/en.json'),
          'nl': require('./nuxt/locales/nl.json'),
        },
        fallbackLocale: 'en'
      },
    }
    ],
  ],
  plugins: [
    '~/plugins/fs' 
  ],
  vuetify: {
    materialIcons: true,
    css: false,
    theme: {
      // This is Freesewing's signature purple
      primary: '#212121', 
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
        path: '/signup/confirm/*', 
        component: 'nuxt/pages/signup/confirm-email.vue'
      })
      routes.push({
        path: '/signup/consent/profile/*', 
        component: 'nuxt/pages/signup/consent-profile.vue'
      })
      routes.push({
        path: '/profile', 
        component: 'nuxt/pages/dynamic/show-user-profile.vue'
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
