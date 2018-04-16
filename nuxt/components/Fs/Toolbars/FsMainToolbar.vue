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
      <nuxt-link to="/">
        <v-btn dark flat>
        <base-logo color="#fff" :size="(32)" />
          <span class="ml-3">{{ $t('freesewing') }}</span>
        </v-btn>
      </nuxt-link>
      <v-menu nudge-right>
        <v-toolbar-title slot="activator">
          <v-btn small flat>
            <img :src="'/icons/locales/'+$i18n.locale+'.svg'" />
          </v-btn>
        </v-toolbar-title>
        <v-list>
          <v-list-tile 
               v-for="(locale, index) in $i18n.locales"
               :key="index" :to="switchLocalePath(locale.code)">
            <v-list-tile-action>
              <img :src="'/icons/locales/'+locale.code+'.svg'" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ locale.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer class="text-xs-center">
      </v-spacer>
        <nuxt-link to="/patrons/join" class="hidden-sm-and-down mr-4">
          <v-btn light color="warning">
            {{ $t('becomeAPatron') }} 
            <v-icon right color="primary">favorite</v-icon>
          </v-btn>
        </nuxt-link>
      <v-btn v-if="right" icon @click.stop="toggleDrawer('right')" class="hidden-xl-only mr-4">
        <v-icon x-large>chevron_left</v-icon>
      </v-btn>
  </v-toolbar>
</template>

<script>
import BaseLogo from '~/components/Base/Branding/BaseLogo'
export default {
  components: {
    BaseLogo
  },
  props: {
    dark: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    right: {
      type: Boolean,
      default: true
    },
  },
  name: 'FsMainToolbar',
  methods: {
    toggleDrawer: function(side) {
      this.$store.commit('toggleDrawer', side)
    }
  }
}
</script>
