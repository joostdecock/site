<template>
  <section class="on-splash fs-m600">
    <div v-if="$store.state.user.loggedIn">
      <fs-message-logout />
    </div>
    <div v-else>
      <div v-if="trouble">
        <div v-if="forgot === 'password'">
          <h1 class="mt-5">{{ $t('iForgotMyPassword') }}</h1>
          <p class="mt-5" v-html="$t('txt-forgot-login')"></p>
          <v-form v-model="valid" class="mt-4">
            <v-text-field :label="$t('usernameOrEmail')" v-model="username" required prepend-icon="perm_identity"></v-text-field>
            <v-btn @click="recoverPassword" color="primary" large class="mt-3">
              <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
              <v-icon v-else class="mr-3">settings_backup_restore</v-icon>
              {{ $t('resetPassword') }}
            </v-btn>
          </v-form>
        </div>
        <div v-else-if="forgot === 'username'">
          <h1 class="mt-5">{{ $t('iForgotMyUsername') }}</h1>
          <p class="mt-5">{{ $t('txt-emailWillWorkToo') }}.</p>
          <v-btn @click="trouble = false; forgot = false" color="primary" large class="mt-3">
            <v-icon class="mr-3">vpn_key</v-icon>
            {{ $t('logIn') }}
          </v-btn>
        </div>
        <div v-else-if="forgot === 'emailSent'">
          <h1 class="mt-5">{{ $t('passwordResetPending') }}</h1>
          <p class="mt-5">{{ $t('pleaseCheckYourInbox') }}.</p>
          <v-btn @click="trouble = false; forgot = false" color="primary" large class="mt-3">
            <v-icon class="mr-3">home</v-icon>
            {{ $t('home') }}
          </v-btn>
        </div>
        <div v-else>
          <h1 class="mt-5">{{ $t('howCanWeHelpYou') }}</h1>
          <v-btn large block class="mt-5" color="primary" @click="forgot='password'">{{ $t('iForgotMyPassword') }}</v-btn>
          <v-btn large block class="mt-3" color="primary" @click="forgot='username'">{{ $t('iForgotMyUsername') }}</v-btn>
        </div>
          <p class="body-1 mt-5">
          <a @click="trouble = false; forgot = false">{{ $t('logIn') }}</a>
          &nbsp;|&nbsp;
          <nuxt-link :to="$fs.path('/signup')">{{ $t('signUpForAFreeAccount') }}</nuxt-link>
          &nbsp;|&nbsp;
          <nuxt-link :to="$fs.path('/docs/contact')">{{ $t('contactUs') }}</nuxt-link>
          </p>
      </div>
      <div v-else>
        <h1 class="mt-5">{{ $t('logIn') }}</h1>
        <v-form v-model="valid" class="mt-4">
          <v-text-field
                                :label="$t('usernameOrEmail')"
                                v-model="username"
                                required
                                prepend-icon="perm_identity"
                                :hint="$t('txt-emailWillWorkToo')"
                                >
          </v-text-field>
            <v-text-field
                                :label="$t('password')"
                                v-model="password"
                                :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (hidePassword = !hidePassword)"
                                :type="hidePassword ? 'password' : 'text'"
                                required
                                prepend-icon="lock"
                                :hint="$t('weCantHelpYouWithThis')"
                                >
            </v-text-field>
            <v-btn @click="submit" color="primary" large class="mt-3">
              <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
              <v-icon v-else class="mr-3">vpn_key</v-icon>
              {{ $t('logIn') }}
            </v-btn>
            <p class="body-1 mt-5">
            <a @click="trouble = true">{{ $t('troubleLoggingIn') }}</a>
            &nbsp;|&nbsp;
            <nuxt-link :to="$fs.path('/signup')">{{ $t('signUpForAFreeAccount') }}</nuxt-link>
            </p>
        </v-form>
      </div>
    </div>
    <v-snackbar
               :timeout="(4000)"
               top
               right
               v-model="error"
               >{{ $t('loginFailed') }}
               <v-btn flat color="primary" @click.native="error = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
  </section>
</template>

<script>
import FsMessageLogout from '~/components/stateful/FsMessageLogout'
export default {
  auth: false,
  layout: 'splash',
  components: {
    FsMessageLogout
  },
  data () {
    return {
      username: '',
      password: '',
      valid: false,
      loading: false,
      error: false,
      hidePassword: true,
      trouble: false,
      forgot: false
    }
  },
  methods: {
    submit: function() {
      this.loading = true;
      this.$fs.login({
        username: this.username,
        password: this.password
      })
      .then((result) => {
        this.loading = false
        this.$router.push(this.$fs.path('/account'))
      })
      .catch((result) => {
        this.loading = false
        this.error = true
      })
    },
    recoverPassword: function() {
      this.loading = true;
      this.$fs.recoverPassword({
        username: this.username
      })
      .then((result) => {
        this.loading = false
        this.forgot = 'emailSent'
      })
      .catch((result) => {
        this.loading = false
        this.error = true
      })
    }
  }
}
</script>

<style scoped>
.on-splash {
  background: #ffffffdd;
  padding: 0 40px 5px;
  text-align: center;
  border-radius: 5px;
  margin-top: -50px
}
</style>
