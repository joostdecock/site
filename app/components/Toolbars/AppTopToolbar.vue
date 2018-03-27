<template>
  <v-toolbar 
    fixed 
    app 
    dark
    color="primary"
    :prominent="alwaysTrue"
    :scroll-off-screen="alwaysTrue"
    >
      <v-btn icon @click.stop="toggleDrawer('left')" class="hidden-lg-and-up ml-4">
        <v-icon large>menu</v-icon>
      </v-btn>
      <div class="hidden-md-and-down ml-3">&nbsp;</div>
        <LangLink to="/">
          <v-btn dark flat>{{ $t('site.title') }}</v-btn>
        </LangLink>
      <v-spacer class="text-xs-right">
        <LangLink to="/patrons/join">
          <v-btn dark color="accent">
            {{ $t('callToAction.becomeAPatron') }} 
            <v-icon right color="primary">favorite</v-icon>
          </v-btn>
        </LangLink>
      </v-spacer>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <v-btn small flat>
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
      <v-btn v-if="showSecondaryMenuToggle" icon @click.stop="toggleDrawer('right')" class="hidden-lg-and-up mr-4">
        <v-icon x-large>chevron_left</v-icon>
      </v-btn>
  </v-toolbar>
</template>

<script>
import FreesewingLogo from '~/components/Branding/FreesewingLogo'
import LangLink from '~/components/i18n/LangLink'
export default {
  components: {
    FreesewingLogo,
    LangLink
  },
  props: {
    showSecondaryMenuToggle: {
      type: Boolean,
      default: true
    },
  },
  name: 'AppTopToolbar',
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
    toggleDrawer: function(side) {
      this.$store.commit('toggleDrawer', side)
    },
    setLocale: function(loc) {
      this.$store.commit('setLocale', loc)
      this.$i18n.locale = loc
    }
  }
}
</script>
