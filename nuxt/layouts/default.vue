<template>
  <v-app>
    <the-right-drawer>
      <div class="fs-scroll-column">
        <component :is="rightColumnComponent" />
      </div>
    </the-right-drawer>
    <the-left-drawer />
    <the-top-toolbar color="white" light class="hidden-md-and-down"/>
    <v-content class="fs-vertical-container">
      <v-container>
        <v-layout row>
          <v-flex xl5 offset-xl2 lg7 offset-lg0 md10 offset-md1 sm12 xs12>
            <nuxt />
          </v-flex>
          <v-flex xl3 offset-xl1 lg4 offset-lg1 hidden-md-and-down>
            <aside class="fs-sticky-column">
              <div class="fs-scroll-column mt-5">
                <component :is="rightColumnComponent" />
              </div>
            </aside>
          </v-flex>
        </v-layout>
        <v-layout row>
           <v-flex xl10 offset-xl1 lg12 md12 sm12 xs12 class="mt-5">
             <fs-page-comments />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <the-footer />
    <v-footer fixed height="auto" class="hidden-lg-and-up">
      <the-mobile-toolbar color="primary" />
    </v-footer>
  </v-app>
</template>

<script>
import TheRightDrawer   from '~/components/stateless/TheRightDrawer'
import TheLeftDrawer    from '~/components/stateless/TheLeftDrawer'
import TheMobileToolbar from '~/components/stateful/TheMobileToolbar'
import TheTopToolbar    from '~/components/stateful/TheTopToolbar'
import FsPageComments   from '~/components/stateless/FsPageComments'
import TheFooter        from '~/components/stateless/TheFooter'
// Dynamic components
import FsDynamicAsideBlogpost from '~/components/stateless/FsDynamicAsideBlogpost'
import FsDynamicAsideShowcase from '~/components/stateless/FsDynamicAsideShowcase'
import FsDynamicAsidePage     from '~/components/stateless/FsDynamicAsidePage'
import FsDynamicAsideDraft    from '~/components/stateless/FsDynamicAsideDraft'
export default {
  components: {
    TheRightDrawer,
    TheLeftDrawer,
    TheMobileToolbar,
    TheTopToolbar,
    FsDynamicAsideBlogpost,
    FsDynamicAsideShowcase,
    FsDynamicAsidePage,
    FsDynamicAsideDraft,
    FsPageComments,
    TheFooter
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
