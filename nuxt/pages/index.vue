<template>
  <section>
    <h1>{{ $t('freesewing') }} </h1>
    <h2>{{ $t('txt-slogan') }} </h2>
    <fs-icon-tshirt :size="(200)" />
    <pre>
    {{ $i18n.messages.en._options }}
    {{ $store.state.user.loggedIn }}
    {{$fs.yaml }}
    </pre>
  </section>
</template>

<script>
import FsIconTshirt      from '~/components/stateless/FsIconTshirt'
export default {
  components: {FsIconTshirt},
  mounted: function() {
  }
}
</script>

