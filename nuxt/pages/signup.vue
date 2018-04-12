<template>
  <section class="on-splash">
    <div v-if="$auth.loggedIn">
      <p>fixme</p>
    </div>
    <div v-else>
      <h1 class="mt-5">{{ $t('signUp') }}</h1>
      <h5>{{ $t('txt-signup-step1') }}</h5>
      <v-form v-model="valid" class="mt-4">
        <v-text-field
              :label="$t('emailAddress')"
              v-model="email"
              required
              prepend-icon="email"
              :hint="$t('txt-email-sharing')"
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
              >
        </v-text-field>
        <v-btn @click="submit" color="primary" large class="mt-3">
          <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">person_add</v-icon>
          {{ $t('signUp') }}
        </v-btn>
        <v-btn large class="mt-3" to="/">
          <v-icon class="mr-3">undo</v-icon>
          {{ $t('cancel') }}
        </v-btn>
        <p class="body-1 mt-5">
        <nuxt-link to="/login">{{ $t('logIn') }}</nuxt-link>
        &nbsp;|&nbsp; 
        <nuxt-link to="/resend">{{ $t('reSendActivationEmail') }}</nuxt-link>
        </p>
      </v-form>
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
export default {
  auth: false,
  layout: 'splash',
  data () {
    return {
      email: '',
      password: '',
      valid: false,
      loading: false,
      error: false,
      hidePassword: true
    }
  },
  computed: { 
    loggedIn () {
      return this.$auth.loggedIn
    }
  },
  methods: {
    submit: function() {
      this.loading = true;
      this.$auth.loginWith('user', {
        data: {
          username: this.username,
          password: this.password
        }
      })
      .catch((i) => {
        this.loading = false;
        this.error = true
      })
      .then((i) => {
        this.loading = false;
      })
    }
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
