<template>
  <section>
    <h1>{{ $t('freesewing') }} </h1>
    <h2>{{ $t('txt-slogan') }} </h2>
    <fs-icon-tshirt :size="(500)" />
    <pre>
    {{ $store.state.user.loggedIn }}
    {{ $fs.yaml }}
    </pre>
  </section>
</template>

<script>
import FsIconTshirt      from '~/components/stateless/FsIconTshirt'
export default {
  components: {FsIconTshirt}
}
</script>

