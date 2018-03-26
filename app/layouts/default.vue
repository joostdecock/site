<template>
  <v-app>
    <TheRightDrawer />
    <AppTopToolbar />
    <TheLeftDrawer />

    <v-content>
      <v-container>
<v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">12</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 v-for="i in 2" :key="`6${i}`">
        <v-card dark color="secondary">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 v-for="i in 3" :key="`4${i}`">
        <v-card dark color="primary">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="i in 4" :key="`3${i}`">
        <v-card dark color="secondary">
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 v-for="i in 6" :key="`2${i}`">
        <v-card dark color="primary">
          <v-card-text class="px-0">2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs1 v-for="i in 12" :key="`1${i}`">
        <v-card dark color="secondary">
          <v-card-text class="px-0">1</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

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
    AppSecondaryMenuCard
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

