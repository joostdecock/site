<template>
  <section>
    <h1>{{ $t('site.title') }} </h1>
      <h2>{{ $t('site.slogan') }} </h2>
</section>
</template>

<script>
  import FsLink from '~/components/Fs/i18n/FsLink'
  export default {
  components: { 
    FsLink 
  },
}
</script>
