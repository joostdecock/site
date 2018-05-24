<template>
  <fs-wrapper-login-required>
      <blockquote class="error ">
        <h2>{{ $t('removeAllMyData') }}</h2>
        <h4>{{ $t('areYouSureAboutThis') }}</h4>
        <p>{{ $t('txt-warningProfileData') }}</p>
        <p>{{ $t('thereIsNoWayBackFromThis') }}</p>
        <p class="text-xs-center">
        <v-btn flat outline color="white" @click="deleteAccount()">
          <v-icon class="mr-3">delete</v-icon>{{ $t('removeAllMyData') }}
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
    deleteAccount: function() {
      this.$fs.deleteAccount()
      .then((result) => {
        this.$router.push($fs.path('/'))
      })
      .catch((error) => { this.error = true })
    },
  }
}
</script>
