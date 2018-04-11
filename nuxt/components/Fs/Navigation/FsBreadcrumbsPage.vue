<template>
  <ul class="breadcrumbs"> 
    <li>
      <nuxt-link to="/">
        <v-icon color="primary">home</v-icon>
      </nuxt-link>
    </li>
    <li><v-icon small>chevron_right</v-icon></li>
    <li>
      <nuxt-link to="/docs">
        {{ $t('documentation') }}
      </nuxt-link>
    </li>
    <li><v-icon small>chevron_right</v-icon></li>
    <template v-for="breadcrumb in breadcrumbs">
      <li :key="'title-'+breadcrumb.permalink">
        <nuxt-link :to="breadcrumb.permalink" :key="'link-'+breadcrumb.permalink">
          {{ breadcrumb.frontMatter.title }}
        </nuxt-link>
      </li>
      <li :key="'spacer-'+breadcrumb.permalink">
        <v-icon :key="'chevron-'+breadcrumb.permalink" small>chevron_right</v-icon></li>
    </template>
    <li class="current">{{ title }}</li>
  </ul>
</template>

<script>
export default {
  name: 'FsBreadcrumbsPage',
  props: {
    breadcrumbs: { 
      type: Array, 
      required: false
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
a { text-decoration: none }
</style>
