<template>
  <section class="page">
    <fs-breadcrumbs-page :breadcrumbs="page.breadcrumbs" :title="page.title" />
      <h1>{{ page.title }} </h1>
      <nuxtdown-body :body="page.body" class="fs-content fs-text" />
  </section>
</template>

<script>
import FsBreadcrumbsPage from '~/components/stateless/FsBreadcrumbsPage'
// Dynamic
export default {
  components: {
    FsBreadcrumbsPage,
  },
  asyncData: async function ({ app, route }) {
    return { page: await app.$content('/'+app.i18n.locale+'/docs').get(route.path)}
  },
  mounted: function() {
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn', 
      component: 'fs-right-column-page'
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
