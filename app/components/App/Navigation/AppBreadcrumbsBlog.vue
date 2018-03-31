<template>
  <ul class="breadcrumbs"> 
    <li>
      <app-link to="/">
        <v-icon color="primary">home</v-icon>
      </app-link>
    </li>
    <li><v-icon small slot="divider">chevron_right</v-icon></li>
    <li>
      <app-link to="/blog">
        {{ $t('mainMenu.blog') }} 
      </app-link>
    </li>
    <li><v-icon small slot="divider">chevron_right</v-icon></li>
    <li class="current">{{ title }}</li>
  </ul>
</template>

<script>
import AppLink from '~/components/App/i18n/AppLink'
export default {
  name: 'AppBreadcrumbsBlog',
  components: {
    AppLink,
  },
  props: {
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
