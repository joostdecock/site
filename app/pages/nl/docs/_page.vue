<template>
  <section>
    <AppBreadcrumbs crumbs="breadcrumbs" />
    <article>
      <h1>{{ page.title }}</h1>
      <nuxtent-body :body="page.body" />
    </article>
  </section>
</template>

<script>
import AppBreadcrumbs from '~/components/Navigation/AppBreadcrumbs'
export default {
    asyncData: async function ({ app, route }) {
        console.log('Getting '+route.path+' from content api')
        return { page: await app.$content('/nl/docs').get(route.path)}
    },
    components: {
      AppBreadcrumbs
    },
    mounted: function() {
      console.log(this.$data.page.meta) 
    }
}
</script>
