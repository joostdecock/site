<template>
  <section class="page">
    <fs-breadcrumbs-page :breadcrumbs="page.breadcrumbs" :title="page.title" />
    <fs-message-locale-fallback v-if="$i18n.locale != page.contentLocale" />
    <article class="fs-content elevation-1 fs-pad">
      <h1>{{ page.title }} </h1>
      <nuxtdown-body :body="page.body" class="fs-content fs-text" />
    </article>
  </section>
</template>

<script>
import FsBreadcrumbsPage from '~/components/stateless/FsBreadcrumbsPage'
import FsMessageLocaleFallback from '~/components/stateless/FsMessageLocaleFallback'

export default {
  components: {
    FsBreadcrumbsPage,
    FsMessageLocaleFallback,
  },
  asyncData: async function ({ app, route }) {
    const data = {}
    let path = route.path
    if(path.substr(0,6) !== '/docs/') {
      path = '/docs'+path
    }
    console.log(path)
    data.page = await app.$content('/'+app.i18n.locale+'/docs').get(path)
    .then(function (data) {
      return data
    })
    .catch(function (res) {
      console.log('Content not found')
    })
    if(typeof data.page === 'undefined' && app.i18n.locale !== 'en') {
      console.log('Trying English version')
      data.page = await app.$content('/en/docs').get(route.path.substr(3))
      .then(function (data) {
        return data
      })
    }
    return data
  },
  mounted: function() {
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn',
      component: 'fs-dynamic-aside-page'
    })
    this.$store.commit('setComponentData', {
      source: 'page',
      data: {
        toc: this.page.toc,
        meta: this.page.meta
      }
    })
  },
  beforeDestroy: function() {
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn',
      component: ''
    })
  }
}
</script>
