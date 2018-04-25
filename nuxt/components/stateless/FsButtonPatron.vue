<template>
  <div class="px-3 fs-nodeco">
    <nuxt-link :to="$fs.path('/patrons/join')" class="txt-xs-center">
      <v-btn large block color="accent">
        <v-icon class="mr-3" color="white">favorite</v-icon>
        {{ $t('becomeAPatron') }}
      </v-btn>
    </nuxt-link>
  </div>
</template>

