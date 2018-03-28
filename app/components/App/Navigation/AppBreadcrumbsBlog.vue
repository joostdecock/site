<template>
  <v-breadcrumbs>
    <v-icon small slot="divider">chevron_right</v-icon>
    <v-breadcrumbs-item>
      <app-link to="/">
        <v-icon color="primary">home</v-icon>
      </app-link>
    </v-breadcrumbs-item>
    <v-breadcrumbs-item>
    </v-breadcrumbs-item>
    <v-breadcrumbs-item>
      <small>{{ title }}</small>
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
    props: {
      title: { 
        type: String, 
        required: true
      }
    }
}
</script>
