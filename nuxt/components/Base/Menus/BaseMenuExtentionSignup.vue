<template>
  <v-list>
    <v-list-tile :to="$fs.path('/signup')">
      <v-list-tile-action>
        <v-icon color="success">person_add</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('signUpForAFreeAccount') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/login')">
      <v-list-tile-action>
        <v-icon color="info">vpn_key</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('logIn') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
