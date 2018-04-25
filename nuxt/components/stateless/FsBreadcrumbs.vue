<template>
  <no-ssr>
  <ul class="breadcrumbs"> 
    <li>
      <nuxt-link to="/">
        <v-icon color="primary">home</v-icon>
      </nuxt-link>
    </li>
    <li><v-icon small>chevron_right</v-icon></li>
    <template v-for="c in crumbs">
      <li :key="'title-'+c.permalink">
        <nuxt-link :to="c.permalink" :key="'link-'+c.permalink">
          {{ c.frontMatter.title }}
        </nuxt-link>
      </li>
      <li :key="'spacer-'+c.permalink">
        <v-icon :key="'chevron-'+c.permalink" small>chevron_right</v-icon></li>
    </template>
    <li class="current"><slot></slot></li>
  </ul>
  </no-ssr>
</template>

<script>
export default {
  name: 'FsBreadcrumbs',
  props: {
    crumbs: { 
      type: Array, 
      default: () => { return [] }
    }
  }
}
</script>

<style scoped>
a { text-decoration: none }
</style>
