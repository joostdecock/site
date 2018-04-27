<template>
  <v-btn color="primary" :to="$fs.path('/login')" class="nodeco">
    <v-icon class="mr-3" color="white">vpn_key</v-icon>
    {{ $t('logIn') }}
  </v-btn>
</template>

