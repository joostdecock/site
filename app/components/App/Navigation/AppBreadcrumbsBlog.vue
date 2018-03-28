<template>
  <v-breadcrumbs>
    <v-icon small slot="divider">chevron_right</v-icon>
    <v-breadcrumbs-item :to="localePrefix+'/'">
      <v-icon color="primary">home</v-icon>
    </v-breadcrumbs-item>
    <v-breadcrumbs-item>
      <app-link to="/blog">
        {{ $t('mainMenu.blog') }} 
      </app-link>
    </v-breadcrumbs-item>
    <v-breadcrumbs-item color="secondary">
      {{ title }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
import AppLink from '~/components/App/i18n/AppLink'
export default {
  name: 'AppBreadcrumbsBlog',
  components: {
    AppLink,
  },
  computed: { 
    localePrefix () {
      return this.$store.state.localePrefix
    }
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
