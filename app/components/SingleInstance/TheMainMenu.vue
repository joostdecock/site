<template>
  <v-navigation-drawer
    v-model="showLeftMenu"
    class=""
    app
    clipped
  >
    <v-list>
      <v-list-tile
        router
        :to="localePrexix+item.to"
        :key="i"
        v-for="(item, i) in items"
        exact
      >
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="$t('mainMenu.'+item.title)"></v-list-tile-title>
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
      },
      localePrexix () {
        if(this.$store.state.locale == this.$store.state.defaultLocale) return ''
        else return '/'+this.$store.state.locale
      }
    },
    data () {
      return {
        items: [
          { icon: 'info_outline', title: 'about', to: '/about' },
          { icon: 'view_carousel', title: 'patterns', to: '/patterns' },
          { icon: 'share', title: 'blog', to: '/blog' },
          { icon: 'photo_camera', title: 'showcase', to: '/showcase' },
          { icon: 'import_contacts', title: 'docs', to: '/docs' },
        ],
      }
    },
  }
</script>
