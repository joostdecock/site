<template>
  <v-app>
    <the-right-drawer>
      <div class="fs-scroll-column">
        <component :is="rightColumnComponent" /> 
      </div>
    </the-right-drawer>
      <the-left-drawer />
        <v-content class="fs-vertical-container">
          <v-container>
            <v-layout row wrap>
              <v-flex xl2 lg3 hidden-md-and-down>
                <aside class="fs-sticky-column">
                  <div class="fs-scroll-column mt-5">
                    <base-main-menu-card /> 
                    <div class="fs-toolbar-spacer"></div>
                  </div>
                </aside>
              </v-flex>
              <v-flex xl6 offset-xl1 lg8 offset-lg1 xs12>
                <nuxt />
              </v-flex>
              <v-flex xl2 offset-xl1 hidden-lg-and-down>
                <aside class="fs-sticky-column">
                  <div class="fs-scroll-column mt-5">
                    <component :is="rightColumnComponent" /> 
                    <div class="fs-toolbar-spacer"></div>
                  </div>
                </aside>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
        <v-footer fixed height="auto">
          <fs-main-toolbar color="primary" />
        </v-footer>
  </v-app>
</template>

<script>
import TheRightDrawer from '~/components/SingleInstance/TheRightDrawer' 
import TheLeftDrawer from '~/components/SingleInstance/TheLeftDrawer' 
import BaseMainMenuCard from '~/components/Base/Menus/BaseMainMenuCard' 
import BaseSecondaryMenuCard from '~/components/Base/Menus/BaseSecondaryMenuCard' 
import FsMainToolbar from '~/components/Fs/Toolbars/FsMainToolbar' 
// Dynamic components
import FsRightColumnBlogpost from '~/components/Fs/Dynamic/FsRightColumnBlogpost'
import FsRightColumnPage from '~/components/Fs/Dynamic/FsRightColumnPage'
import FsRightColumnShowcase from '~/components/Fs/Dynamic/FsRightColumnShowcase'
export default {
  components: { 
    TheRightDrawer,
    TheLeftDrawer,
    BaseMainMenuCard,
    BaseSecondaryMenuCard,
    FsMainToolbar,
    FsRightColumnBlogpost,
    FsRightColumnPage,
    FsRightColumnShowcase
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
