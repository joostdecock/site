<template>
  <v-app>
    <TheRightDrawer />
    <AppTopToolbar />
    <TheLeftDrawer />

    <v-content>
      <v-container>
        <v-layout row wrap>
          <v-flex xl2 lg2 hidden-md-and-down class="fs-sticky-menu">
            <AppMainMenuCard /> 
          </v-flex>
          <v-flex xl6 offset-xl1 lg8 xs12>
            <nuxt />
          </v-flex>
          <v-flex xl2 offset-xl1 lg2 hidden-md-and-down class="fs-sticky-menu">
            <AppSecondaryMenuCard />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer dark height="auto">
      <span>fixme</span>
    </v-footer>

  </v-app>
</template>

<script>
import TheLeftDrawer from '~/components/SingleInstance/TheLeftDrawer'
import TheRightDrawer from '~/components/SingleInstance/TheRightDrawer'
import AppTopToolbar from '~/components/Toolbars/AppTopToolbar'
import AppMainMenuCard from '~/components/Menus/AppMainMenuCard'
import AppSecondaryMenuCard from '~/components/Menus/AppSecondaryMenuCard'
  export default {
  components: { 
    TheLeftDrawer,
    TheRightDrawer,
    AppTopToolbar,
    AppMainMenuCard,
    AppSecondaryMenuCard,
  },
    data () {
      return {
        title: 'Freesewing',
        drawer: false,
        rightDrawer: false,
        alwaysTrue: true,
        alwaysFalse: false,
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
      }
    }
  }
</script>

<style scoped>
  .fs-sticky-menu {
    position: sticky;
    top: 10px;
    align-self: flex-start;
  }
</style>

