<template>
  <section class="container text-xs-center">
    <h1>fixme</h1>
    <div v-if="$auth.loggedIn">
      <p>You are logged in</p>
      <v-btn @click="logout" color="secondary" large>Logout</v-btn>
    </div>
    <div v-else>
      <h4>{{ $t('enterUsernamePassword') }}</h4>
      <v-form v-model="valid">
        <v-text-field
          :label="$t('username')"
          v-model="username"
          required
        ></v-text-field>
        <v-text-field
          :label="$t('password')"
          v-model="password"
          type="password"
          required
        ></v-text-field>
        <v-btn @click="submit" color="primary" large>
          {{ $t('login') }}
          <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
        </v-btn>
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
  data () {
    return {
      username: '',
      password: '',
      valid: false,
      loading: false,
      error: false
    }
  },
  mounted: () => { 
  //  console.log($auth.user)
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
    },
    logout: function() {
      this.$auth.logout()
      this.$auth.reset()
    }
  }
}
</script>

<style scoped>
  form {
    max-width: 300px;
    margin: auto;
  }
</style>
