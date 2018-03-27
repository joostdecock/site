<template>
  <section>
    <h1>{{ $t('site.title') }} </h1>
      <h2>{{ $t('site.slogan') }} </h2>
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
