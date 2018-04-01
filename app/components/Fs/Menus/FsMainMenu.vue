<template>
  <v-list>
    <v-list-tile
      router
      :to="localePrefix+item.to"
      :key="i"
      v-for="(item, i) in items"
      exact
    >
      <v-list-tile-action>
        <v-icon color="primary" v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="$t('mainMenu.'+item.title)"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'FsMainMenu',
    computed: { 
      localePrefix () {
        return this.$store.state.localePrefix
      }
    },
    data () {
      return {
        items: [
          { icon: 'home', title: 'home', to: '/' },
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

<style scope>
a.list__tile--active {
  background: #e4c7ff66 !important;
  font-weight: bold;
}
</style>
