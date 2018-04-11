<template>
  <v-list>
    <v-list-tile to="/signup">
      <v-list-tile-action>
        <v-icon color="success">vpn_key</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('signUpForAFreeAccount') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
