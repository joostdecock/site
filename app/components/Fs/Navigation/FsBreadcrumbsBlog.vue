<template>
  <ul class="breadcrumbs"> 
    <li>
      <fs-link to="/">
        <v-icon color="primary">home</v-icon>
      </fs-link>
    </li>
    <li><v-icon small slot="divider">chevron_right</v-icon></li>
    <li>
      <fs-link to="/blog">
        {{ $t('mainMenu.blog') }} 
      </fs-link>
    </li>
    <li><v-icon small slot="divider">chevron_right</v-icon></li>
    <li class="current">{{ title }}</li>
  </ul>
</template>

<script>
import FsLink from '~/components/Fs/i18n/FsLink'
export default {
  name: 'FsBreadcrumbsBlog',
  components: {
    FsLink,
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
