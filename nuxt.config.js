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
    name: 'docs-route',
    component: 'nuxt/pages/docs/_page.vue'
  },
  {
    path: '/signup/confirm/*',
    name: 'confirm-email',
    component: 'nuxt/pages/signup/confirm-email.vue'
  },
  {
    path: '/signup/consent/*',
    name: 'consent-profile',
    component: 'nuxt/pages/signup/consent-profile.vue'
  },
  {
    path: '/email/confirm/*',
    name: 'confirm-email-change',
    component: 'nuxt/pages/account/confirm-email-change.vue'
  },
  {
    path: '/account/recover/*',
    name: 'recover-password',
    component: 'nuxt/pages/account/recover-password.vue'
  },
  {
    path: '/patterns/*',
    name: 'pattern-page',
    component: 'nuxt/pages/patterns/_pattern.vue'
  },
  {
    path: '/draft/:pattern',
    name: 'draft-step1',
    component: 'nuxt/pages/draft/choose-model.vue'
  },
  {
    path: '/draft/:pattern/for/:model',
    name: 'draft-step2',
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
    name: 'draft-page',
    component: 'nuxt/pages/drafts/show-draft.vue'
  },
  {
    path: '/models/:model',
    name: 'model-page',
    component: 'nuxt/pages/models/show-model.vue'
  },
  {
    path: '/i18n/:locale',
    name: 'locale-page',
    component: 'nuxt/pages/i18n/status-locale.vue'
  },
  {
    path: '/blog/category/:category',
    name: 'blog-cat',
    component: 'nuxt/pages/blog/blog-category.vue'
  },
  {
    path: '/showcase/category/:category',
    name: 'showcase-cat',
    component: 'nuxt/pages/showcase/showcase-category.vue'
  },
  {
    path: '/users/:user',
    name: 'user-page',
    component: 'nuxt/pages/users/show-user.vue'
  },
  {
    path: '/admin/users/:user',
    name: 'admin-user-page',
    component: 'nuxt/pages/admin/users/admin-user.vue'
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
      { name: 'theme-color', content: '#212121'},
      { name: 'msapplication-config', content: '/img/icons/browser/browserconfig.xml'},
      { name: 'keywords', content: 'freesewing, sewing, patterns, opensource, free, sewing patterns, download, community'},
      { name: 'description', content: 'Freesewing is an open source platform for made-to-measure sewing patterns'},
      { name: 'subject', content: 'Freesewing'},
      { name: 'copyright', content: 'Joost De Cock'},
      { vmid: 'language', name: 'language', content: 'EN'},
      { name: 'robots', content: 'index.follow'},
      { name: 'author', content: 'Joost De Cock'},
    ],
    link: [
      { rel: 'stylesheet', href: '/css/prism.css' },
      { rel: 'manifest', href: '/img/icons/browser/manifest.json' },
      { rel: 'shortcut icon', href: '/img/icons/browser/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/img/icons/browser/apple-icon.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/img/icons/browser/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/icons/browser/apple-icon-180x180.png' },
      { rel: 'icon', sizes: '192x192', href: '/img/icons/browser/android-icon-192x192.png' }
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
          code: 'de',
          iso: 'de-DE',
          name: 'Deutsch'
        },
        {
          code: 'es',
          iso: 'es-ES',
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
          de: require('./nuxt/locales/de/de.json'),
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
    materialIcons: true,
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
    middleware: ['auth','log'],
    extendRoutes (routes, resolve) {
      for(let i in topLevelDocRoutes) {
        routes.push({
          path: '/'+topLevelDocRoutes[i],
          name: 'toplevel-docs-'+i,
          component: 'nuxt/pages/docs/_page.vue'
        })
      }
      for(let i in dynamicRoutes) {
        routes.push(dynamicRoutes[i])
      }
    }
  },
  generate: {
    interval: 500,
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
        '/patterns/penelope',

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
        '/draft/penelope',
    ]
  },
  build: {
    postcss: false,
    extractCSS: true,
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
