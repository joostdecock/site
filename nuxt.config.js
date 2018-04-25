const freesewingConfig = {
  api: {
    data: process.env.FS_DATA,
    content: process.env.FS_SITE+"/content-api"
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
    materialIcons: false,
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
    browserBaseURL: 'https://joost.data.freesewing.org'
  },
  auth: {
    cookie: false,
    redirect: {
    },
    strategies: {
      signup: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: freesewingConfig.api.data+"/newuser",
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: freesewingConfig.api.data+"/account",
            method: 'get'
          }
        }
      },
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
        path: '/docs/*', 
        component: 'nuxt/pages/docs/_page.vue'
      })
      routes.push({
        path: '/signup/confirm/*', 
        component: 'nuxt/pages/signup/confirm-email.vue'
      })
      routes.push({
        path: '/signup/consent/*', 
        component: 'nuxt/pages/signup/consent-profile.vue'
      })
      routes.push({
        path: '/patterns/*', 
        component: 'nuxt/pages/patterns/_pattern.vue'
      })
      routes.push({
        path: '/draft/:pattern', 
        component: 'nuxt/pages/draft/choose-model.vue'
      })
      routes.push({
        path: '/draft/:pattern/for/:model', 
        component: 'nuxt/pages/draft/choose-options.vue'
      })
    }
  },
  generate: {
    interval: 100,
    routes: [
        '/patterns/aaron',
        '/patterns/brian',
        '/patterns/bruce',
        '/patterns/cathrin',
        '/patterns/hugo',
        '/patterns/simon',
        '/patterns/sven',
        '/patterns/tamiko',
        '/patterns/theo',
        '/patterns/theodore',
        '/patterns/trayvon',
        '/patterns/wahid',
        '/patterns/benjamin',
        '/patterns/bent',
        '/patterns/carlita',
        '/patterns/carlton',
        '/patterns/florent',
        '/patterns/jaeger',

        '/draft/aaron',
        '/draft/brian',
        '/draft/bruce',
        '/draft/cathrin',
        '/draft/hugo',
        '/draft/simon',
        '/draft/sven',
        '/draft/tamiko',
        '/draft/theo',
        '/draft/theodore',
        '/draft/trayvon',
        '/draft/wahid',
        '/draft/benjamin',
        '/draft/bent',
        '/draft/carlita',
        '/draft/carlton',
        '/draft/florent',
        '/draft/jaeger',
    ]
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
