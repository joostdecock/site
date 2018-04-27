<template>
  <div>
    <v-toolbar color="white" class="fs-shadow">
      <v-spacer></v-spacer>
      <nuxt-link :to="$fs.path('/patterns')">
        <v-btn flat large>
          <v-icon class="mr-3">content_paste</v-icon>
          {{ $t('patterns') }}
        </v-btn>
      </nuxt-link>
      <nuxt-link :to="$fs.path('/blog')">
        <v-btn flat large>
          <v-icon class="mr-3">rss_feed</v-icon>
          {{ $t('blog') }}
        </v-btn>
      </nuxt-link>
      <the-documentation-dropdown-menu />
      <the-community-dropdown-menu />
      <nuxt-link :to="$fs.path('/search')">
        <v-btn flat large>
          <v-icon class="mr-3">search</v-icon>
          {{ $t('search') }}
        </v-btn>
      </nuxt-link>
      <the-language-dropdown-menu />
      <v-spacer></v-spacer>
    </v-toolbar>
    <the-user-toolbar v-if="$auth.loggedIn" />
    <the-visitor-toolbar  v-else />
  </div>
</template>

<script>
import FsIconGithub      from '~/components/stateless/FsIconGithub'
import FsIconTwitter     from '~/components/stateless/FsIconTwitter'
import FsIconInstagram   from '~/components/stateless/FsIconInstagram'
import FsIconGitter      from '~/components/stateless/FsIconGitter'
import TheUserToolbar    from '~/components/stateless/TheUserToolbar'
import TheVisitorToolbar from '~/components/stateless/TheVisitorToolbar'

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
    TheUserToolbar,
    TheVisitorToolbar,
    TheDocumentationDropdownMenu,
    TheCommunityDropdownMenu,
    TheLanguageDropdownMenu
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
