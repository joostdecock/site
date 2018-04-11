<template>
  <section class="container text-xs-center">
    <div v-if="$auth.loggedIn">
      <p>You are logged in</p>
      <v-btn @click="logout" color="secondary" large>Logout</v-btn>
    </div>
    <div v-else>
      <h1>{{ $t('signUp') }}</h1>
      <h4>{{ $t('txt-signup-step1') }}</h4>
      <v-form v-model="valid">
        <v-text-field
              :label="$t('email')"
              v-model="email"
              required
              prepend-icon="email"
              ></v-text-field>
          <v-text-field
              :label="$t('password')"
              v-model="password"
              :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (hidePassword = !hidePassword)"
              :type="hidePassword ? 'password' : 'text'"
              required
              prepend-icon="vpn_key"
              ></v-text-field>
            <v-btn @click="submit" color="primary" large>
              {{ $t('signUp') }}
              <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
            </v-btn>
      </v-form>

        <p>
        * {{ $t('txt-email-sharing') }}
        <br>
        * {{ $t('txt-password-policy') }}
        </p>
      <ul class="steps mt-5">
        <li><v-icon>check_circle</v-icon>{{ $t('txt-signup-step1') }}</li>
      </ul>
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
      email: '',
      password: '',
      valid: false,
      loading: false,
      error: false,
      hidePassword: true
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
.input-group--required label::after {
  content: ''!important;
}
ul.steps {
  margin-left: 0;
  font-size: 70%;
}
ul.steps li {
  list-style-type: none;
}
</style>
