<template>
  <v-toolbar 
    fixed 
    app 
    dark
    color="primary"
    height="76"
    :prominent="alwaysTrue"
    :scroll-off-screen="alwaysTrue"
    >
      <v-toolbar-side-icon @click.stop="toggleMenu('left')"></v-toolbar-side-icon>
    <v-flex xs5>
      <div class="hidden-md-only hidden-sm-only hidden-xs-only">
        <nuxt-link to="/" class="ml-2">
          <span style="color: white; font-weight: 200; font-size: 32px; padding: 0 5px 0; line-height: 1;">{{ $t('site.title') }}</span>
          <br>
          <span style="color: white; padding: 0 15px 0;">{{ $t('site.slogan') }}</span>
      </nuxt-link>
      </div>
    </v-flex>
    <v-flex xs2>
    <div class="text-xs-center">
      <nuxt-link to="/" class="ml-2">
        <FreesewingLogo />
      </nuxt-link>
    </div>
    </v-flex>
    <v-flex xs5 class="text-right-xs">
    <div class="text-xs-right">
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <v-btn flat>
            <img :src="'/icons/locales/'+locale+'.svg'" />
          </v-btn>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="loc in locales" :key="loc" @click="setLocale(loc)">
            <v-list-tile-action>
              <img :src="'/icons/locales/'+loc+'.svg'" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ $t('locales.'+loc, loc) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn
        icon
        @click.stop="toggleMenu('right')"
      >
        <v-icon>toc</v-icon>
      </v-btn>
    </div>
    </v-flex>
  </v-toolbar>
</template>

<script>
import FreesewingLogo from '~/components/Branding/FreesewingLogo'
export default {
  components: {
    FreesewingLogo
  },
  name: 'TheTopToolbar',
    computed: { 
      locale () {
        return this.$store.state.locale
      },
      locales () {
        return this.$store.state.locales
      }
    },
  data () {
    return {
      items: [
      { icon: 'apps', title: 'Welcome', to: '/' },
      { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      alwaysTrue: JSON.parse('true')
    }
  },
  methods: {
    toggleMenu: function(side) {
      this.$store.commit('toggleMenu', side)
    },
    setLocale: function(loc) {
      this.$store.commit('setLocale', loc)
      this.$i18n.locale = loc
    }
  }
}
</script>
