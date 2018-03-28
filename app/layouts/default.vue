<template>
  <v-app>
    <the-right-drawer />
      <the-left-drawer />
        <v-content class="fs-vertical-container">
          <v-container grid-list-lg>
            <v-layout row wrap>
              <v-flex xl2 lg3 hidden-md-and-down class="fs-sticky-column">
                <base-main-menu-card /> 
              </v-flex>
              <v-flex xl6 offset-xl1 lg8 offset-lg1 xs12>
                <nuxt />
              </v-flex>
              <v-flex xl2 offset-xl1 hidden-lg-and-down class="fs-sticky-column">
                <component :is="rightColumnComponent" /> 
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
// Dynamic components
import AppRightColumnBlogpost from '~/components/App/Dynamic/AppRightColumnBlogpost'
export default {
  components: { 
    TheRightDrawer,
    TheLeftDrawer,
    BaseMainMenuCard,
    BaseSecondaryMenuCard,
    AppMainToolbar,
    AppRightColumnBlogpost
  },
  computed: { 
    rightColumnComponent () {
      return this.$store.state.components.dynamic.rightColumn
    },
    rightDrawerComponent () {
      return this.$store.state.components.dynamic.rightColumn
    }
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
