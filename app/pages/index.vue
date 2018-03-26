<template>
  <section>
    <h1>{{ $t('site.title') }} </h1>
    <h2>{{ $t('site.slogan') }} </h2>
    <p>English muffins promo</p>
    <ul>
      <li><LangLink to="/docs/typography">Typography</LangLink></li> 
      <li><LangLink to="/docs/about">About page</LangLink></li> 
    </ul>
  </section>
</template>

<script>
  import LangLink from '~/components/i18n/LangLink'
  export default {
  components: { LangLink },
  computed: { 
    locale () {
      return this.$store.state.locale
    }
  }
}
</script>
