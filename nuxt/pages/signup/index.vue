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
        <div v-if="reason === 'user_exists'" class="mt-5">
          <v-btn :to="$fs.path('/login')" large color="primary">
            <v-icon class="mr-3">vpn_key</v-icon>
            {{ $t('logIn') }}
          </v-btn>
          <v-btn @click="error = false" large>
            <v-icon class="mr-3">undo</v-icon>
            {{ $t('tryAgain') }}
          </v-btn>
        </div>
        <div v-else-if="reason === 'signup_pending'" class="mt-5">
        <v-divider />
        <p class="body-1 mt-3"> {{ $t('txt-emailNotFound') }}</p>
          <v-btn :to="$fs.path('/docs/contact')" large color="primary">
            <v-icon class="mr-3">room_service</v-icon>
            {{ $t('contactUs') }}
          </v-btn>
          <v-btn @click="error = false" large>
            <v-icon class="mr-3">undo</v-icon>
            {{ $t('tryAgain') }}
          </v-btn>
        </div>
        <div v-else-if="reason === 'invalid_input'" class="mt-5">
          <v-btn @click="error = false" large color="primary">
            <v-icon class="mr-3">undo</v-icon>
            {{ $t('tryAgain') }}
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
        <h1 class="mt-5 mb-1">{{ $t('welcomeAboard') }}</h1>
        <p>
          {{ $t('signup-success-text', {email: email}) }}
          <br>
          <b>{{ $t('txt-clickEmailLink') }}</b>
        </p>
        <v-divider />
        <p class="body-1 mt-3"> {{ $t('txt-emailNotFound') }}</p>
      </div>
      <div v-else>
      <h1 class="mt-5">{{ $t('signUp') }}</h1>
      <h5>{{ $t('txt-signup-step1') }}</h5>
      <v-form v-model="valid" class="mt-4">
        <v-text-field
              :label="$t('emailAddress')"
              v-model="email"
              required
              type="email"
              prepend-icon="email"
              :hint="$t('txt-email-sharing')"
              :autofocus="(true)"
              >
        </v-text-field>
        <v-text-field
              :label="$t('password')"
              v-model="password"
              :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidePassword = !hidePassword)"
              :type="hidePassword ? 'password' : 'text'"
              required
              prepend-icon="vpn_key"
              :hint="$t('txt-password-policy')"
              @keyup.enter="submit"
              >
        </v-text-field>
        <v-btn @click="submit" color="primary" large class="mt-3">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">person_add</v-icon>
          {{ $t('signUp') }}
        </v-btn>
        <v-btn large class="mt-3" :to="$fs.path('/')">
          <v-icon class="mr-3">undo</v-icon>
          {{ $t('cancel') }}
        </v-btn>
        <p class="body-1 mt-5" v-if="resend">{{ $t('txt-resend') }}</p>
        <p class="body-1 mt-5">
        <nuxt-link :to="$fs.path('/login')">{{ $t('logIn') }}</nuxt-link>
        &nbsp;|&nbsp;
        <a @click="resend=false" v-if="resend">{{ $t('cancel') }}</a>
        <a @click="resend=true" v-else>{{ $t('reSendActivationEmail') }}</a>
        </p>
      </v-form>
    </div>
      </div>
  </section>
</template>

<script>
import FsIconGithub from '~/components/stateless/FsIconGithub'
import FsIconGitter from '~/components/stateless/FsIconGitter'
import FsMessageLogout from '~/components/stateful/FsMessageLogout'
export default {
  auth: false,
  layout: 'splash',
  components: {
    FsIconGithub,
    FsIconGitter,
    FsMessageLogout
  },
  data () {
    return {
      email: '',
      password: '',
      valid: false,
      loading: false,
      error: false,
      success: false,
      hidePassword: true,
      reason: '',
      resend: false
    }
  },
  methods: {
    submit: function() {
      this.loading = true;
      this.error = false;
      this.reason = '';
      this.$fs.signup({
        email: this.email,
        password: this.password,
        locale: this.$i18n.locale
      })
      .catch((e) => {
        this.loading = false;
        this.error = true
        this.reason = e.response.data.reason
      })
      .then((i) => {
        if(!this.error) {
          this.loading = false;
          this.success = true;
        }
      })
    }
  }
}
</script>

<style scoped>
.on-splash {
  max-width: 600px;
  margin: auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 40px 5px;
  margin-top: 50px;
  text-align: center;
  border-radius: 5px;
}
</style>
