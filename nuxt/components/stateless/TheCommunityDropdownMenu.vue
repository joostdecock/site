<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator">
      <v-btn large flat>
        <v-icon class="mr-3" color="info">extension</v-icon>
        {{ $t('community') }}
        <v-icon color="secondary">arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-list>
      <v-list-tile :to="$fs.path('/showcase')">
        <v-list-tile-action><v-icon>photo_camera</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('showcase') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="https://gitter.im/freesewing/freesewing" target="_BLANK">
        <v-list-tile-action><fs-icon-gitter /></v-list-tile-action>
          <v-list-tile-content>{{ $t('chatOnGitter') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="https://github.com/freesewing" target="_BLANK">
        <v-list-tile-action><fs-icon-github /></v-list-tile-action>
          <v-list-tile-content>{{ $t('GitHub') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="https://twitter.com/freesewing_org" target="BLANK">
        <v-list-tile-action><fs-icon-twitter /></v-list-tile-action>
          <v-list-tile-content>{{ $t('Twitter') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="https://instagram.com/freesewing_org" target="_BLANK">
        <v-list-tile-action><fs-icon-instagram /></v-list-tile-action>
          <v-list-tile-content>{{ $t('Instagram') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="$fs.path('/patrons')">
        <v-list-tile-action><v-icon>translate</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('translationTeam') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/patrons')">
        <v-list-tile-action><v-icon color="accent">favorite</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('patrons') }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import FsIconGithub    from '~/components/stateless/FsIconGithub'
import FsIconTwitter   from '~/components/stateless/FsIconTwitter'
import FsIconInstagram from '~/components/stateless/FsIconInstagram'
import FsIconGitter    from '~/components/stateless/FsIconGitter'

export default {
  name: 'TheCommunityDropdownMenu',
  components: {
    FsIconGithub,
    FsIconTwitter,
    FsIconInstagram,
    FsIconGitter
  }
}
</script>
