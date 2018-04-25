<template>
  <div class="px-3 fs-nodeco">
    <nuxt-link :to="$fs.path('/signup')" class="txt-xs-center">
      <v-btn large block color="success">
        <v-icon class="mr-3" color="white">person_add</v-icon>
        {{ $t('signUp') }}
      </v-btn>
    </nuxt-link>
  </div>
</template>

