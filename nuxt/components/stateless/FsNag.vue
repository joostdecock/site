<template>
  <blockquote
    v-if="!$store.state.user.isPatron"
    class="fs-m800 fs-patron accent mt-5 mb-5 fs-pad elevation-4"
    style="background:transparent linear-gradient(45deg, rgb(255, 91, 119) 0%, rgb(251, 66, 102) 50%, rgb(243, 52, 87) 71%, rgb(255, 77, 109) 100%) repeat scroll 0% 0%; color:#fff;">
    <h3>{{ $t('joinTheFreesewingPatrons') }}</h3>
    <h5>{{ $t('joinTheFreesewingPatrons-txt') }}</h5>
    <p class='text-xs-right'><v-btn :to="$fs.path('/patrons/join')" large color="primary">{{ $t('learnMore')}}</v-btn></p>
  </blockquote>
</template>

