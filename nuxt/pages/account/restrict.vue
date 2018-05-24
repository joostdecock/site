<template>
  <fs-wrapper-login-required>
    <blockquote class="error ">
      <h2>{{ $t('stopProcessingMyData') }}</h2>
      <h4>{{ $t('areYouSureAboutThis') }}</h4>
      <p>{{ $t('txt-warningDataRestriction') }}</p>
      <p class="text-xs-center">
      <v-btn flat outline color="white" @click="freezeAccount()">
        <v-icon class="mr-3">kitchen</v-icon>{{ $t('freezeMyAccount') }}
      </v-btn>
      <v-btn flat outline color="white" :to="$fs.path('/account')">
        <v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}
      </v-btn>
      </p>
    </blockquote>
  </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
export default {
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs,
  },
  layout: 'wide',
  data: function() {
    return {
      error: false,
    }
  },
  methods: {
    freezeAccount: function() {
      this.$fs.freezeAccount()
      .then((result) => {
        this.$router.push($fs.path('/'))
      })
      .catch((error) => { this.error = true })
    },
  }
}
</script>
