<template>
  <section>
    <h1>{{ $t('site.title') }} </h1>
    <h2>{{ $t('site.slogan') }} </h2>
    <ul>
      <li><lang-link to="/docs/typography">Typography</lang-link></li> 
      <li><lang-link to="/docs/about">About page</lang-link></li> 
    </ul>
  </section>
</template>

<script>
  import AppLink from '~/components/App/i18n/AppLink'
  export default {
  components: { 
    AppLink 
  },
}
</script>
