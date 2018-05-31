<template>
  <blockquote class="error text-xs-left fs-m800 mt-5 fs-bq">
    <h3>{{ $t('ohNo') }}</h3>
    <h5>{{ $t('somethingWentWrong') }}</h5>
    <p>{{ $t('txt-errorPleaseReportIssue') }}</p>
    <p class="text-xs-right mt-4">
      <v-btn color="white"  href="https://github.com/freesewing/site/issues/new">
        <fs-icon-github color="primary" class="mr-3"/>{{$t('reportThisOnGithub')}}
      </v-btn>
      <v-btn flat outline color="white"  :to="$fs.path('/')">
        <v-icon color="white" class="mr-3">home</v-icon>{{$t('home')}}
      </v-btn>
    </p>
  </blockquote>
</template>

<script>
import FsIconGithub from '~/components/stateless/FsIconGithub'

export default {
  name: 'FsMessageErrorPleaseReport',
  components: {
    FsIconGithub,
  }
}
</script>
