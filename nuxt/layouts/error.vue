<template>
  <div style="margin: auto; text-align: center;">
    <span v-if="error.statusCode === 404" style="font-size: 7vw; font-weight: 900; line-height: 1; display: block;">404</span>
    <span v-else style="font-size: 7vw; font-weight: 900; line-height: 1.5; display: block;">¯\_(ツ)_/¯</span>
    <h1 v-if="error.statusCode === 404">{{ $t('pageNotFound') }}</h1>
    <h1 v-else>{{ $t('error-unknown') }}</h1>
    <p>
      <nuxt-link :to="$fs.path('/')">{{ $t('home') }}</nuxt-link>
      <span class="px-3">|</span>
      <a href="https://github.com/freesewing/site/issues/new">{{ $t('reportThisOnGitHub') }}</a>
    </p>
    <nuxt-link :to="$fs.path('/')">
      <img src="/img/patterns/simon/cover.jpg" style="max-height: 50vh;">
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'bare',
  props: ['error']
}
</script>

