<template>
  <v-app class="homepage">
    <the-left-drawer />
    <the-top-toolbar color="transparent" :dark="(true)" class="hidden-md-and-down" :splash="(true)"/>
    <v-content>
      <v-container grid-list-lg>
        <nuxt />
      </v-container>
    </v-content>
    <the-footer />
    <v-footer fixed height="auto" class="hidden-lg-and-up">
      <the-mobile-toolbar color="primary" :right="(false)" />
    </v-footer>
  </v-app>
</template>

<script>
import TheLeftDrawer    from '~/components/stateless/TheLeftDrawer'
import TheMobileToolbar from '~/components/stateful/TheMobileToolbar'
import TheTopToolbar    from '~/components/stateful/TheTopToolbar'
import TheFooter        from '~/components/stateless/TheFooter'

export default {
  components: {
    TheLeftDrawer,
    TheMobileToolbar,
    TheTopToolbar,
    TheFooter
  },
}
</script>

<style>
#app.homepage {
  background-size: 100% auto;
  background-position: top right;
  background-repeat: no-repeat;
  background-image: url('/img/shipbg.svg');
}
</style>

