<template>
  <v-toolbar 
    :color="color"
    flat
    >
      <v-spacer class="text-xs-center"></v-spacer>

      <nuxt-link :to="$fs.path('/patterns')">
        <v-btn flat large>
          <v-icon class="mr-3" color="primary">content_paste</v-icon>
          {{ $t('patterns') }}
        </v-btn>
      </nuxt-link>

      <nuxt-link :to="$fs.path('/documentation')">
        <v-btn flat large>
          <v-icon class="mr-3" color="primary">import_contacts</v-icon>
          {{ $t('documentation') }}
        </v-btn>
      </nuxt-link>
      
      <nuxt-link :to="$fs.path('/blog')">
        <v-btn flat large>
          <v-icon class="mr-3" color="primary">rss_feed</v-icon>
          {{ $t('blog') }}
        </v-btn>
      </nuxt-link>
      
      <nuxt-link :to="$fs.path('/search')">
        <v-btn flat large>
          <v-icon class="mr-3" color="primary">search</v-icon>
          {{ $t('search') }}
        </v-btn>
      </nuxt-link>

      <v-menu nudge-right>
        <v-toolbar-title slot="activator">
          <v-btn large flat>
            {{ $t('community') }}
            <v-icon class="ml-3">arrow_drop_down</v-icon>
          </v-btn>
        </v-toolbar-title>
        <v-list>
          <v-list-tile :to="$fs.path('/patrons')">
            <v-list-tile-content>
              <v-list-tile-title>
                 <base-logo :size="(20)" color="#212121" class="mr-3"/>
                {{ $t('patrons') }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="$fs.path('/showcase')">
            <v-list-tile-content>
              <v-list-tile-title>
                <v-icon class="mr-3" color="primary">photo_camera</v-icon>
                {{ $t('showcase') }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="https://gitter.im/freesewing/freesewing">
            <v-list-tile-content>
              <v-list-tile-title>
                <v-icon class="mr-3" color="primary">chat</v-icon>
                {{ $t('chat') }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="https://github.com/freesewing">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('GitHub') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="https://twitter.com/freesewing_org">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('Twitter') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="https://instagram.com/freesewing_org">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t('Instagram') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu nudge-right>
        <v-toolbar-title slot="activator">
          <v-btn large flat>
            <img class="mr-3" :src="'/icons/locales/'+$i18n.locale+'.svg'" />
            FIXME
            <v-icon class="ml-3">arrow_drop_down</v-icon>
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
      <v-spacer class="text-xs-center"></v-spacer>

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
  },
  name: 'FsMainToolbar',
  methods: {
    toggleDrawer: function(side) {
      this.$store.commit('toggleDrawer', side)
    }
  }
}
</script>
