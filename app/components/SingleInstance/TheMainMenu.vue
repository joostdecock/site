<template>
  <v-navigation-drawer
    v-model="showLeftMenu"
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
</template>

<script>
  export default {
    name: 'TheMainMenu',
    computed: { 
      showLeftMenu: {
        get: function () {
          return this.$store.state.menu.left
        },
        set: function (value) {
          if(value) this.$store.commit('showMainMenu')
          else this.$store.commit('hideMainMenu')
        }
      }
    },
    data () {
      return {
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ]
      }
    },
  }
</script>
