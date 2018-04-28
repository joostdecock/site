<template>
  <v-app>
    <the-left-drawer />
      <the-top-toolbar color="white" light class="hidden-md-and-down"/>
      <v-content class="fs-vertical-container">
        <v-container>
          <v-layout row wrap>
            <v-flex xl10 offset-xl1 lg12 md12 sm12 xs12>
              <nuxt />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer fixed height="auto" class="hidden-lg-and-up">
        <the-mobile-toolbar color="primary" :right="(false)" />
      </v-footer>
  </v-app>
</template>

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
