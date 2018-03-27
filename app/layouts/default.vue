<template>
  <v-app>
    <the-right-drawer />
    <the-left-drawer />
    <v-content>
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xl2 lg3 hidden-md-and-down class="fs-sticky-menu">
            <base-main-menu-card /> 
          </v-flex>
          <v-flex xl6 offset-xl1 lg8 offset-lg1 xs12>
            <nuxt />
          </v-flex>
          <v-flex xl2 offset-xl1 hidden-lg-and-down class="fs-sticky-menu">
            <base-secondary-menu-card /> 
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer fixed height="auto">
      <app-main-toolbar color="primary" />
    </v-footer>
  </v-app>
</template>

<script>
  import TheRightDrawer from '~/components/SingleInstance/TheRightDrawer' 
  import TheLeftDrawer from '~/components/SingleInstance/TheLeftDrawer' 
  import BaseMainMenuCard from '~/components/Base/Menus/BaseMainMenuCard' 
  import BaseSecondaryMenuCard from '~/components/Base/Menus/BaseSecondaryMenuCard' 
  import AppMainToolbar from '~/components/App/Toolbars/AppMainToolbar' 
  export default {
  components: { 
    TheRightDrawer,
    TheLeftDrawer,
    BaseMainMenuCard,
    BaseSecondaryMenuCard,
    AppMainToolbar
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

