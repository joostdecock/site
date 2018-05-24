<template>
  <v-list :dense="dense" :class="dense ? 'fs-side-sub' : ''">
    <v-list-tile :to="$fs.path('/showcase')">
      <v-list-tile-action><v-icon>photo_camera</v-icon></v-list-tile-action>
      <v-list-tile-content>{{ $t('showcase') }}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile href="https://gitter.im/freesewing/freesewing" target="_BLANK">
      <v-list-tile-action><fs-icon-gitter color="#00000080" /></v-list-tile-action>
        <v-list-tile-content>{{ $t('chatOnGitter') }}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile href="https://github.com/freesewing" target="_BLANK">
      <v-list-tile-action><fs-icon-github  color="#00000080" /></v-list-tile-action>
        <v-list-tile-content>{{ $t('github') }}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile href="https://twitter.com/freesewing_org" target="BLANK">
      <v-list-tile-action><fs-icon-twitter color="#00000080" /></v-list-tile-action>
        <v-list-tile-content>{{ $t('twitter') }}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile href="https://instagram.com/freesewing_org" target="_BLANK">
      <v-list-tile-action><fs-icon-instagram color="#00000080" /></v-list-tile-action>
        <v-list-tile-content>{{ $t('instagram') }}</v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile :to="$fs.path('/i18n')">
      <v-list-tile-action><v-icon>translate</v-icon></v-list-tile-action>
      <v-list-tile-content>{{ $t('i18n') }}</v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/patrons')">
      <v-list-tile-action><v-icon color="accent">favorite</v-icon></v-list-tile-action>
      <v-list-tile-content>{{ $t('patrons') }}</v-list-tile-content>
    </v-list-tile>
  </v-list>
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
  },
  props: {
    dense: Boolean
  }
}
</script>
