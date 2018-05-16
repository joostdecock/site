<template>
  <v-container class="py-0">
    <v-layout row wrap>
      <v-flex xl10 offset-xl1 lg12 md12 sm12 xs12>
        <v-toolbar color="transparent" flat class="fs-hr fs-ht--bottom" :dark="dark">
          <v-btn :to="$fs.path('/')" flat class="fs-ucase fs-m0" active-class="default-class fs-active-btn">
            <fs-logo :color="(dark) ? '#FFF' : '#212121'" :size="(42)" class="mr-3"/>
            {{ $t('freesewing') }}
          </v-btn>
          <v-btn :to="$fs.path('/patterns')" flat class="fs-ucase fs-m0" active-class="default-class fs-active-btn">
            {{ $t('patterns') }}
          </v-btn>
          <v-btn :to="$fs.path('/blog')" flat class="fs-ucase fs-m0" active-class="default-class fs-active-btn">
            {{ $t('blog') }}
          </v-btn>
          <the-documentation-dropdown-menu />
            <the-community-dropdown-menu />
              <v-spacer></v-spacer>
              <v-btn :to="$fs.path('/search')" active-class="default-class fs-active-btn" flat class="fs-m0">
                <v-icon>search</v-icon>
              </v-btn>
              <the-language-dropdown-menu />
        </v-toolbar>
        <the-user-toolbar v-if="$store.state.user.loggedIn" />
          <the-visitor-toolbar  v-else-if="!splash" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FsIconGithub      from '~/components/stateless/FsIconGithub'
import FsIconTwitter     from '~/components/stateless/FsIconTwitter'
import FsIconInstagram   from '~/components/stateless/FsIconInstagram'
import FsIconGitter      from '~/components/stateless/FsIconGitter'
import FsIconTshirt      from '~/components/stateless/FsIconTshirt'
import TheUserToolbar    from '~/components/stateless/TheUserToolbar'
import TheVisitorToolbar from '~/components/stateless/TheVisitorToolbar'
import FsLogo            from '~/components/stateless/FsLogo'

import TheDocumentationDropdownMenu  from '~/components/stateless/TheDocumentationDropdownMenu'
import TheCommunityDropdownMenu      from '~/components/stateless/TheCommunityDropdownMenu'
import TheLanguageDropdownMenu       from '~/components/stateless/TheLanguageDropdownMenu'

export default {
  name: 'TheTopToolbar',
  components: {
    FsIconGithub,
    FsIconTwitter,
    FsIconInstagram,
    FsIconGitter,
    FsIconTshirt,
    TheUserToolbar,
    TheVisitorToolbar,
    TheDocumentationDropdownMenu,
    TheCommunityDropdownMenu,
    TheLanguageDropdownMenu,
    FsLogo
  },
  props: {
    splash: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      dark: this.$fs.conf.ui.darkToolbar
    }
  },
  computed: {
    // Name of the current language to show in the toolbar
    localeName () {
      const self = this
      for (let locale of this.$i18n.locales) {
        if(locale.code === self.$i18n.locale) {
          return locale.name
        }
      }
      return ''
    }
  },
  methods: {
    toggleDrawer: function(side) {
      this.$store.commit('toggleDrawer', side)
    }
  }
}
</script>
