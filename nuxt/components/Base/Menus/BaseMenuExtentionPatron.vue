<template>
  <v-list> 
    <v-list-tile :to="$fs.path('/patrons/join')">
      <v-list-tile-action>
        <v-icon color="accent">favorite</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('becomeAPatron') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
