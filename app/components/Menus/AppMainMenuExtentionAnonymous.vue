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
        <v-icon v-html="item.icon" color="success"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="$t('mainMenu.'+item.title)"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'AppMainMenuExtentionAnonymous',
    computed: { 
      localePrefix () {
        if(this.$store.state.locale == this.$store.state.defaultLocale) return ''
        else return '/'+this.$store.state.locale
      }
    },
    data () {
      return {
        items: [
          { icon: 'vpn_key', title: 'signup', to: '/signup' },
        ],
      }
    },
  }
</script>
