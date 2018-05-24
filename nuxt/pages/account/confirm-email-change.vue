<template>
  <section class="on-splash">
      <div v-if="error" class="mb-5">
        <h1 class="mt-5">{{ $t('ohNo') }}</h1>
        <h5> {{ $t('signup-'+reason+'-title') }}</h5>
        <p> {{ $t('txt-emailChangeConfirmationNotFound') }}</p>
        <v-btn :to="$fs.path('/account')" large color="primary">
          <v-icon class="mr-3">tune</v-icon>
          {{ $t('settings') }}
        </v-btn>
        <v-btn :to="$fs.path('/docs/contact')" large color="primary">
          <v-icon class="mr-3">room_service</v-icon>
          {{ $t('contactUs') }}
        </v-btn>
      </div>
      <div v-else-if="success">
        <h1 class="mt-5 mb-1">{{ $t('okThatsDone') }}</h1>
        <h5 class="mb-3"> {{ $t('justAMoment') }}</h5>
        <v-progress-circular indeterminate color="#fff" class="mb-3 mt-3" :size="40" :width="2"></v-progress-circular>
      </div>
      <div v-else>
        <h1 class="mt-5">{{ $t('justAMoment') }}</h1>
        <h5>{{ $t('weAreValidatingYourConfirmationCode') }}</h5>
        <v-progress-circular indeterminate color="#fff" class="mb-3 mt-3" v-if="loading" :size="40" :width="2"></v-progress-circular>
      </div>
  </section>
</template>

<script>
import FsIconGithub from '~/components/stateless/FsIconGithub'
import FsMessageLogout from '~/components/stateful/FsMessageLogout'
export default {
  auth: false,
  layout: 'splash',
  components: {
    FsIconGithub,
    FsMessageLogout
  },
  data () {
    return {
      loading: true,
      error: false,
      success: false,
      reason: ''
    }
  },
  mounted: function(){
    let hashPosition
    if (this.$i18n.locale === this.$i18n.fallbackLocale) {
      hashPosition = 15
    } else {
      hashPosition = 18
    }
    const hash = window.location.pathname.substr(hashPosition, 40)
    this.$fs.confirmEmailChange(hash)
    .then((i) => {
      if(!this.error) {
        this.loading = false;
        this.success = true;
        this.$router.push(this.$fs.path('/account'))
      }
    })
    .catch((e) => {
      this.loading = false;
      this.error = true
      this.reason = e.response.data.reason
    })
  }
}
</script>

<style scoped>
.on-splash {
  max-width: 600px;
  margin: auto;
  background: #ffffffdd;
  padding: 10px 40px 5px;
  margin-top: 50px;
  text-align: center;
  border-radius: 5px;
}
</style>
