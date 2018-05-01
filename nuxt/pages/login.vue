<template>
  <section class="on-splash">
    <div v-if="$store.state.loggedIn">
      <base-logout />
    </div>
    <div v-else>
      <h1 class="mt-5">{{ $t('logIn') }}</h1>
      <v-form v-model="valid" class="mt-4">
        <v-text-field
          :label="$t('username')"
          v-model="username"
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
          prepend-icon="lock"
          :hint="$t('txt-password-policy')"
          >
          </v-text-field>
          <v-btn @click="submit" color="primary" large class="mt-3">
            <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
            <v-icon v-else class="mr-3">vpn_key</v-icon>
            {{ $t('logIn') }}
          </v-btn>
          <v-btn large class="mt-3" :to="$fs.path('/')">
            <v-icon class="mr-3">cancel</v-icon>
            {{ $t('cancel') }}
          </v-btn>
          <p class="body-1 mt-5"><nuxt-link :to="$fs.path('/signup')">{{ $t('signUpForAFreeAccount') }}</nuxt-link></p>
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
      hidePassword: true
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
        this.$router.go(-1)
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
  max-width: 600px;
  margin: auto;
  background: #ffffffdd;
  padding: 10px 40px 5px;
  margin-top: 50px;
  text-align: center;
  border-radius: 5px;
}
</style>
