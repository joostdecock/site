<template>
  <section class="on-splash">
    <div v-if="$store.state.loggedIn">
      <fs-message-logout />
    </div>
    <div v-else>
      <div v-if="error" class="mb-5">
        <h1 class="mt-5">{{ $t('ohNo') }}</h1>
        <h5> {{ $t('signup-'+reason+'-title') }}</h5>
        <p> {{ $t('signup-'+reason+'-text') }}</p>
        <div v-if="reason === 'no_such_pending_confirmation'" class="mt-5">
          <v-btn :to="$fs.path('/signup')" large color="primary">
            <v-icon class="mr-3">vpn_key</v-icon>
            {{ $t('signUp') }}
          </v-btn>
          <v-btn :to="$fs.path('/docs/contact')" large color="primary">
            <v-icon class="mr-3">room_service</v-icon>
            {{ $t('contactUs') }}
          </v-btn>
        </div>
        <div v-else-if="reason === ''" class="mt-5">
          <v-btn href="https://github.com/freesewing/site/issues/new?title=Problems%20signing%20up" large color="primary" target="_BLANK">
            <fs-icon-github color="#ffffff" class="mr-3"/>
            {{ $t('createIssueOnGithub') }}
          </v-btn>
          <v-btn @click="error = false" large >
            <v-icon class="mr-3">undo</v-icon>
            {{ $t('tryAgain') }}
          </v-btn>
        </div>
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
      hashPosition = 16
    } else {
      hashPosition = 19
    }
    const hash = window.location.pathname.substr(hashPosition, 40)
    this.$fs.api.data.get('confirm/'+hash)
    .catch((e) => {
      this.loading = false;
      this.error = true
      this.reason = e.response.data.reason
    })
    .then((i) => {
      if(!this.error) {
        this.loading = false;
        this.success = true;
        this.$router.push(this.$fs.path('/signup/consent/'+hash))
      }
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
