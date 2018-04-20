<template>
  <v-app>
    <the-right-drawer>
      <div class="fs-scroll-column">
        <component :is="rightColumnComponent" /> 
      </div>
    </the-right-drawer>
    <the-left-drawer />
      <fs-top-toolbar color="white" light class="hidden-md-and-down"/>
        <v-content class="fs-vertical-container">
          <v-container>
            <v-layout row wrap>
              <v-flex xl6 offset-xl1 lg7 offset-lg0 md10 offset-md1 sm12 xs12>
                <nuxt />
              </v-flex>
              <v-flex xl3 offset-xl1 lg4 offset-lg1 hidden-md-and-down>
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
        <v-footer fixed height="auto" class="hidden-lg-and-up">
          <fs-main-toolbar color="primary" />
        </v-footer>
  </v-app>
</template>

<script>
import TheRightDrawer from '~/components/SingleInstance/TheRightDrawer' 
import TheLeftDrawer from '~/components/SingleInstance/TheLeftDrawer' 
import FsMainToolbar from '~/components/Fs/Toolbars/FsMainToolbar' 
import FsTopToolbar from '~/components/Fs/Toolbars/FsTopToolbar' 
// Dynamic components
import FsRightColumnBlogpost from '~/components/Fs/Dynamic/FsRightColumnBlogpost'
import FsRightColumnPage from '~/components/Fs/Dynamic/FsRightColumnPage'
import FsRightColumnShowcase from '~/components/Fs/Dynamic/FsRightColumnShowcase'
export default {
  components: { 
    TheRightDrawer,
    TheLeftDrawer,
    FsMainToolbar,
    FsTopToolbar,
    FsRightColumnBlogpost,
    FsRightColumnPage,
    FsRightColumnShowcase,
  },
  computed: { 
    rightColumnComponent () {
      return this.$store.state.components.dynamic.rightColumn
    },
    rightDrawerComponent () {
      return this.$store.state.components.dynamic.rightColumn
    }
  },
  created: function() {
    if(!this.$auth.loggedIn) {
      this.$auth.loginWith('user');
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
