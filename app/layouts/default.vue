<template>
  <v-app>
    <TheMainMenu />
    <TheTopToolbar />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>


    <v-navigation-drawer
      temporary
      :right="alwaysTrue"
      v-model="rightDrawer"
      fixed
    >
        Hi there 
    </v-navigation-drawer>


    <v-footer app dark>
      <span>&copy; 2017</span>
    </v-footer>


  </v-app>
</template>

<script>
import TheMainMenu from '~/components/SingleInstance/TheMainMenu'
import TheTopToolbar from '~/components/SingleInstance/TheTopToolbar'
  export default {
  components: { 
    TheMainMenu,
    TheTopToolbar
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
