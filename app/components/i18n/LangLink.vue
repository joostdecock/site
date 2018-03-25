<template>
  <nuxt-link :to="localePrefix+to"><slot /></nuxt-link>
</template>

<script>
export default {
  name: 'LangLink',
  props: {
    to: {
      type: String,
      default: '/'
    }
  },
  computed: { 
    localePrefix () {
      if(this.$store.state.locale == this.$store.state.defaultLocale) return ''
      else return '/'+this.$store.state.locale
    }
  }
}
</script>
