<template>
  <blockquote class="fs-m800 mt-5 mb-5 warning fs-bq">
    <h1>404</h1>
    <h5>{{ $t('pageNotFound') }}</h5>
    <p class="text-xs-center">
      <v-btn class="mt-5" large flat outline color="primary" :to="$fs.path('/')">
        <v-icon class="mr-3">home</v-icon>
        {{ $t('home') }}
      </v-btn>
    </p>
  </blockquote>
</template>
