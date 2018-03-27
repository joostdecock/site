<template>
  <v-list>
    <v-list-tile
      router
      exact
      @click="goToChat(gitter)"
    >
      <v-list-tile-action>
        <FreesewingLogo :size="(24)" color="#000" />
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="$t('mainMenu.'+title)"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import FreesewingLogo from '~/components/Branding/FreesewingLogo'
  export default {
    name: 'AppMainMenuExtentionAnonymous',
    components: {
      FreesewingLogo
    },
    computed: { 
      localePrefix () {
        if(this.$store.state.locale == this.$store.state.defaultLocale) return ''
        else return '/'+this.$store.state.locale
      }
    },
    data () {
      return {
        icon: 'face', 
        title: 'chat', 
        gitter: 'https://gitter.im/freesewing/freesewing'
      }
    },
    methods: {
      goToChat: function(url) {
        window.location = url
      
      }
    },
  }
</script>
