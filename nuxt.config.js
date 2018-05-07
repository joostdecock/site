
module.exports = {
  srcDir: 'nuxt/',
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: "freesewing.org",
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
      secondary: '#848484',
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
  router: {
    middleware: 'auth',
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
        path: '/email/confirm/*',
        component: 'nuxt/pages/account/confirm-email-change.vue'
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
      routes.push({
        path: '/fork/:draft',
        component: 'nuxt/pages/fork/choose-model.vue'
      })
      routes.push({
        path: '/fork/:draft/for/:model',
        component: 'nuxt/pages/fork/choose-options.vue'
      })
      routes.push({
        path: '/drafts/:draft',
        component: 'nuxt/pages/drafts/_draft.vue'
      })
      routes.push({
        path: '/models/:model',
        component: 'nuxt/pages/models/_model.vue'
      })
    }
  },
  generate: {
    interval: 1000,
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
    postcss: false,
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
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(yaml|yml)$/,
        loader: 'yaml-loader',
        exclude: /(node_modules)/
      })
    }
  }
}
