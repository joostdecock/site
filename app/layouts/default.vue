<template>
  <v-app>
    <TheRightDrawer />
    <TheTopToolbar />
    <TheLeftDrawer />

    <v-content>
      <v-container>
        <v-layout row wrap>
          <AppMainMenuCardFloating /> 
          <v-flex xs12 lg8 xl5 offset-xl1>
            <nuxt />
          </v-flex>
          <v-flex lg2 xl3 ml-3 hidden-md-and-down>
            Right col 
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
import TheTopToolbar from '~/components/SingleInstance/TheTopToolbar'
import AppMainMenuCardFloating from '~/components/Menus/AppMainMenuCardFloating'
  export default {
  components: { 
    TheLeftDrawer,
    TheRightDrawer,
    TheTopToolbar,
    AppMainMenuCardFloating
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
