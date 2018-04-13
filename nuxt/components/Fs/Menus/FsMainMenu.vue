<template>
  <v-list>
    <v-list-tile
      router
      :to="$fs.path(item.to)"
      :key="i"
      v-for="(item, i) in items"
      exact
    >
      <v-list-tile-action>
        <v-icon color="primary" v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="$t(item.title)"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'FsMainMenu',
    data () {
      return {
        items: [
          { icon: 'home', title: 'home', to: '/' },
          { icon: 'info_outline', title: 'aboutFreesewing', to: '/docs/about' },
          { icon: 'content_paste', title: 'patterns', to: '/patterns' },
          { icon: 'rss_feed', title: 'blog', to: '/blog' },
          { icon: 'import_contacts', title: 'documentation', to: '/docs' },
        ],
      }
    },
  }
</script>

<style scope>
a.list__tile--active {
  background: rgba(0, 0, 0, .05)!important;
  font-weight: bold;
  border-right: 5px solid #212121;
}
</style>
