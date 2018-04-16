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
        <v-icon v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="$t(item.title)"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'FsSecondaryMenu',
    computed: { 
      localePrefix () {
        if(this.$store.state.locale == this.$store.state.defaultLocale) return ''
        else return '/'+this.$store.state.locale
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
          { icon: 'import_contacts', title: 'documentation', to: '/docs' },
        ],
      }
    },
  }
</script>
