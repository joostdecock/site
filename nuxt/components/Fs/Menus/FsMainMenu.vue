<template>
  <v-list>
    <v-list-tile :to="$fs.path('/docs/about')" v-if="!$auth.loggedIn">
      <v-list-tile-action>
        <v-icon color="primary">info_outline</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('aboutFreesewing') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/patterns')">
      <v-list-tile-action>
        <v-icon color="primary">content_paste</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('patterns') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/docs')">
      <v-list-tile-action>
        <v-icon color="primary">import_contacts</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('documentation') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/blog')">
      <v-list-tile-action>
        <v-icon color="primary">rss_feed</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('blog') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
