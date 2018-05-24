<template>
  <v-toolbar dark color="primary" >
    <v-btn icon @click.stop="toggleDrawer('left')" class="hidden-lg-and-up ml-4">
      <v-icon large>menu</v-icon>
    </v-btn>
    <nuxt-link to="/">
      <v-btn dark flat>
        <fs-logo color="#fff" :size="(32)" />
          <span class="ml-3">{{ $t('freesewing') }}</span>
      </v-btn>
    </nuxt-link>
    <v-spacer class="text-xs-center"></v-spacer>
    <v-menu nudge-right>
      <v-toolbar-title slot="activator">
        <v-btn small flat>
          <img :src="'/icons/flags/'+$i18n.locale+'.svg'" />
        </v-btn>
      </v-toolbar-title>
      <v-list>
        <v-list-tile v-for="(locale, index) in $i18n.locales" :key="index" :to="switchLocalePath(locale.code)">
          <v-list-tile-action>
            <img :src="'/icons/flags/'+locale.code+'.svg'" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ locale.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn v-if="right" icon @click.stop="toggleDrawer('right')" class="hidden-xl-only mr-4">
      <v-icon x-large>chevron_left</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import FsLogo from '~/components/stateless/FsLogo'
export default {
  name: 'TheMobileToolbar',
  components: { FsLogo },
  props: {
    right: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    toggleDrawer: function(side) {
      this.$store.commit('toggleDrawer', side)
    }
  }
}
</script>
