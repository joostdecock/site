<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      mobile-break-point="10000"
      fixed
      app
      temporary
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      

    </v-navigation-drawer>


    <v-toolbar 
        fixed 
        app 
        dark
        color="primary"
        height="76"
        :prominent="alwaysTrue"
        :scroll-off-screen="alwaysTrue"
    >
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>


    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>


    <v-navigation-drawer
      temporary
      :right="alwaysRight"
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
  export default {
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

