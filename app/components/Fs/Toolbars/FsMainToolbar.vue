<template>
  <v-toolbar 
    :dark="dark"
    :color="color"
    flat
    >
      <v-btn icon @click.stop="toggleDrawer('left')" class="hidden-lg-and-up ml-4">
        <v-icon large>menu</v-icon>
      </v-btn>
      <div class="hidden-md-and-down ml-3">&nbsp;</div>
      <fs-link to="/">
        <v-btn dark flat>{{ $t('site.title') }}</v-btn>
      </fs-link>
      <v-menu nudge-right>
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
      <v-spacer class="text-xs-center">
      </v-spacer>
        <fs-link to="/patrons/join" class="hidden-sm-and-down mr-4">
          <v-btn light color="warning">
            {{ $t('callToAction.becomeAPatron') }} 
            <v-icon right color="primary">favorite</v-icon>
          </v-btn>
        </fs-link>
      <v-btn icon @click.stop="toggleDrawer('right')" class="hidden-xl-only mr-4">
        <v-icon x-large>chevron_left</v-icon>
      </v-btn>
  </v-toolbar>
</template>

<script>
import FsLink from '~/components/Fs/i18n/FsLink'
export default {
  components: {
    FsLink
  },
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    dark: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'primary'
    },
  },
  name: 'FsMainToolbar',
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
      this.$moment.locale(loc)
    }
  }
}
</script>
