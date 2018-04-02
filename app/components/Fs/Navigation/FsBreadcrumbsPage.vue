<template>
  <ul class="breadcrumbs"> 
    <li>
      <fs-link to="/">
        <v-icon color="primary">home</v-icon>
      </fs-link>
    </li>
    <li><v-icon small>chevron_right</v-icon></li>
    <li>
      <fs-link to="/docs">
        {{ $t('mainMenu.docs') }}
      </fs-link>
    </li>
    <li><v-icon small>chevron_right</v-icon></li>
    <template v-for="breadcrumb in breadcrumbs">
      <li :key="'title-'+breadcrumb.permalink">
        <fs-link :to="breadcrumb.permalink" :key="'link-'+breadcrumb.permalink">
          {{ breadcrumb.frontMatter.title }}
        </fs-link>
      </li>
      <li :key="'spacer-'+breadcrumb.permalink">
        <v-icon :key="'chevron-'+breadcrumb.permalink" small>chevron_right</v-icon></li>
    </template>
    <li class="current">{{ title }}</li>
  </ul>
</template>

<script>
import FsLink from '~/components/Fs/i18n/FsLink'
export default {
  name: 'FsBreadcrumbsPage',
  components: {
    FsLink,
  },
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
