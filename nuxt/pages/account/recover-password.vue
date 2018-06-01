<template>
  <section class="on-splash fs-m600">
    <div v-if="error" class="mb-5">
      <h1 class="mt-5">{{ $t('ohNo') }}</h1>
      <h5> {{ $t('signup-'+reason+'-title') }}</h5>
      <p> {{ $t('txt-passwordRecoverConfirmationNotFound') }}</p>
      <v-btn :to="$fs.path('/account')" large color="primary">
        <v-icon class="mr-3">vpn_key</v-icon>
        {{ $t('logIn') }}
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
      <h1 class="mt-5">{{ $t('chooseANewPassword') }}</h1>
      <h5>{{ $t('enterYourNewPassword') }}</h5>
      <v-form v-model="valid" class="mt-4">
        <v-text-field
                              :label="$t('password')"
                              v-model="password"
                              :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                              :append-icon-cb="() => (hidePassword = !hidePassword)"
                              :type="hidePassword ? 'password' : 'text'"
                              required
                              prepend-icon="lock"
                              :hint="$t('txt-password-policy')"
                              >
        </v-text-field>
        <v-btn @click="submit" color="primary" large class="mt-3" :disabled="password.length === 0">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">save</v-icon>
          {{ $t('save') }}
        </v-btn>
        <p class="body-1 mt-5">
        <a @click="trouble = true">{{ $t('troubleLoggingIn') }}</a>
        &nbsp;|&nbsp;
        <nuxt-link :to="$fs.path('/signup')">{{ $t('signUpForAFreeAccount') }}</nuxt-link>
        </p>
      </v-form>
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
      loading: false,
      error: false,
      success: false,
      reason: '',
      valid: false,
      hidePassword: true,
      password: ''
    }
  },
  methods: {
    submit: function() {
      let hashPosition
      if (this.$i18n.locale === this.$i18n.fallbackLocale) {
        hashPosition = 17
      } else {
        hashPosition = 20
      }
      const hash = window.location.pathname.substr(hashPosition, 40)
      this.$fs.resetPassword({hash: hash, password: this.password})
      .then((i) => {
        if(!this.error) {
          this.loading = false;
          this.success = true;
          this.$router.push(this.$fs.path('/'))
        }
      })
      .catch((e) => {
        this.loading = false;
        this.error = true
      })
    }
  }
}
</script>

<style scoped>
.on-splash {
  background: rgba(255, 255, 255, 0.9);
  padding: 5px 40px 5px;
  margin-top: -50px;
  text-align: center;
  border-radius: 5px;
}
</style>
