<template>
  <v-toolbar color="white" flat>
    <v-spacer></v-spacer>
    <nuxt-link :to="$fs.path('/signup')">
      <v-btn large color="success">
        <v-icon class="mr-3" color="white">person_add</v-icon>
        {{ $t('signUpForAFreeAccount') }}
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="$fs.path('/login')">
      <v-btn large color="primary">
        <v-icon class="mr-3" color="white">vpn_key</v-icon>
        {{ $t('logIn') }}
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="$fs.path('/patrons/join')">
      <v-btn large color="accent">
        <v-icon class="mr-3" color="white">favorite</v-icon>
        {{ $t('becomeAPatron') }}
      </v-btn>
    </nuxt-link>
    <v-spacer></v-spacer>
  </v-toolbar>
  </div>
</template>
