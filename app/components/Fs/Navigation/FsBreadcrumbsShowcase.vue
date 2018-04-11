<template>
  <ul class="breadcrumbs"> 
    <li>
      <nuxt-link to="/">
        <v-icon color="primary">home</v-icon>
      </nuxt-link>
    </li>
    <li><v-icon small slot="divider">chevron_right</v-icon></li>
    <li>
      <nuxt-link to="/showcase">
        {{ $t('showcase') }} 
      </nuxt-link>
    </li>
    <li><v-icon small slot="divider">chevron_right</v-icon></li>
    <li class="current">{{ title }}</li>
  </ul>
</template>

<script>
export default {
  name: 'FsBreadcrumbsShowcase',
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
