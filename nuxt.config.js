const topLevelDocRoutes = [
  'contact',
  'privacy',
  'help',
  'rights',
  'about'
]
const dynamicRoutes = [
  {
    path: '/docs/*',
    component: 'nuxt/pages/docs/_page.vue'
  },
  {
    path: '/signup/confirm/*',
    component: 'nuxt/pages/signup/confirm-email.vue'
  },
  {
    path: '/signup/consent/*',
    component: 'nuxt/pages/signup/consent-profile.vue'
  },
  {
    path: '/email/confirm/*',
    component: 'nuxt/pages/account/confirm-email-change.vue'
  },
  {
    path: '/account/recover/*',
    component: 'nuxt/pages/account/recover-password.vue'
  },
  {
    path: '/patterns/*',
    component: 'nuxt/pages/patterns/_pattern.vue'
  },
  {
    path: '/draft/:pattern',
    component: 'nuxt/pages/draft/choose-model.vue'
  },
  {
    path: '/draft/:pattern/for/:model',
    component: 'nuxt/pages/draft/choose-options.vue'
  },
  {
    path: '/fork/:draft',
    name: 'fork-1',
    component: 'nuxt/pages/fork/choose-model.vue',
  },
  {
    path: '/fork/:draft/for/:model',
    name: 'fork-2',
    component: 'nuxt/pages/fork/choose-options.vue',
  },
  {
    path: '/redraft/:draft',
    name: 'redraft-1',
    component: 'nuxt/pages/fork/choose-model.vue',
  },
  {
    path: '/redraft/:draft/for/:model',
    name: 'redraft-2',
    component: 'nuxt/pages/fork/choose-options.vue',
  },
  {
    path: '/drafts/:draft',
    component: 'nuxt/pages/drafts/_draft.vue'
  },
  {
    path: '/models/:model',
    component: 'nuxt/pages/models/_model.vue'
  },
  {
    path: '/i18n/:locale',
    component: 'nuxt/pages/i18n/status-locale.vue'
  },
]

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
          code: 'es',
          name: 'Español'
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
          en: require('./nuxt/locales/en/en.json'),
          es: require('./nuxt/locales/es/es.json'),
          nl: require('./nuxt/locales/nl/nl.json'),
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
      warning: '#FF9900',
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
      for(let i in topLevelDocRoutes) {
        routes.push({
          path: '/'+topLevelDocRoutes[i],
          component: 'nuxt/pages/docs/_page.vue'
        })
      }
      for(let i in dynamicRoutes) {
        routes.push(dynamicRoutes[i])
      }
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
