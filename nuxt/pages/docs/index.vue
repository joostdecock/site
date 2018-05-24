<template>
  <section class="page">
    <fs-breadcrumbs>{{ $t('documentation') }}</fs-breadcrumbs>
    <h1>{{ $t('documentation') }}</h1>
    <div class="fs-content elevation-1 mt-5 fs-pad">
      <blockquote class="warning fs-m800 mt-5 mb-5">
        <h4>I hope you like lists!</h4>
        <p>Unfortunately, we haven't fully migrated all our documenation to the new site.
        <p>We are working on it, and hope to have it sorted soon.</p>
        <p>In the meanwhile, here is a list of all the documentation pages:</p>
      </blockquote>
      <ul>
        <li v-for="page in pages" :key="page.permalink">
          <router-link :to="page.permalink">{{ page.title }}</router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
export default {
  components: {
    FsBreadcrumbs
  },
  asyncData: async function ({ app, route }) {
    var list =  await app.$content('/'+app.i18n.locale+'/docs').getAll();
    return { pages: list }
  }
}
</script>
