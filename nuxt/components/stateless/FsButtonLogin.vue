<template>
  <div class="px-3 fs-nodeco">
    <nuxt-link :to="$fs.path('/login')" class="txt-xs-center">
      <v-btn large block color="primary">
        <v-icon class="mr-3" color="white">vpn_key</v-icon>
        {{ $t('logIn') }}
      </v-btn>
    </nuxt-link>
  </div>
</template>

