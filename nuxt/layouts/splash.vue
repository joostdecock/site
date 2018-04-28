<template>
  <v-app class="splash">
    <the-left-drawer />
    <the-top-toolbar color="transparent" light class="hidden-md-and-down" :splash="(true)"/>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed height="auto" class="hidden-lg-and-up">
      <the-mobile-toolbar color="primary" :right="(false)" />
    </v-footer>
  </v-app>
</template>

<style>
#app.splash {
  background: #212121;
  background-size: cover;
  background-position: center;
  background-image: url('/img/potm/potm.jpg');
}
</style>

<script>
import TheLeftDrawer    from '~/components/stateless/TheLeftDrawer'
import TheMobileToolbar from '~/components/stateful/TheMobileToolbar'
import TheTopToolbar    from '~/components/stateful/TheTopToolbar'

export default {
  components: {
    TheLeftDrawer,
    TheMobileToolbar,
    TheTopToolbar
  },
}
</script>

