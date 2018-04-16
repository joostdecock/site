<template>
  <section class="on-splash">
    <div v-if="$auth.loggedIn">
      <base-logout />
    </div>
    <div v-else>
      <div v-if="error" class="mb-5">
        {{ reason }}
        <h1 class="mt-5">{{ $t('ohNo') }}</h1>
        <h5> {{ $t('signup-'+reason+'-title') }}</h5>
        <p> {{ $t('signup-'+reason+'-text') }}</p>
        <div v-if="reason === 'no_such_pending_confirmation'" class="mt-5">
          <v-btn :to="$fs.path('/signup')" large color="primary">
            <v-icon class="mr-3">vpn_key</v-icon>
            {{ $t('signUp') }}
          </v-btn>
          <v-btn :to="$fs.path('/docs/contact')" large>
            <v-icon class="mr-3">room_service</v-icon>
            {{ $t('contactUs') }}
          </v-btn>
        </div>
        <div v-else-if="reason === 'user_exists'" class="mt-5">
          <v-btn :to="$fs.path('/signup')" large color="primary">
            <v-icon class="mr-3">vpn_key</v-icon>
            {{ $t('signUp') }}
          </v-btn>
          <v-btn :to="$fs.path('/docs/contact')" large>
            <v-icon class="mr-3">room_service</v-icon>
            {{ $t('contactUs') }}
          </v-btn>
        </div>
        <div v-else-if="reason === ''" class="mt-5">
          <v-btn href="https://github.com/freesewing/site/issues/new?title=Problems%20consent%20signing%20up" large color="primary" target="_BLANK">
            <icon-github color="#ffffff" class="mr-3"/>
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
        <h3>{{ $t('txt-consentProfile') }}</h3>
        <v-switch v-model="consent" color="success" :label= "consent ? $t('yesIDo') : $t('noIDoNot')"></v-switch>
        <v-btn color="success" class="mb-5" :disabled="!consent" @click="createAccount">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>check_circle</v-icon>
          {{ $t('createMyAccount') }}
        </v-btn>
        <v-btn color="error" class="mb-5" :disabled="consent" @click="deleteConfirmation">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" size="20" width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>cancel</v-icon>
          {{ $t('removeAllMyData') }}
        </v-btn>
        <consent-profile />
          <p class="body-1 mt-3">
          {{ $t('txt-gdprCompliant') }} 
          <nuxt-link :to="$fs.path('/privacy')" class="ml-3">{{ $t('privacyInfo')}}</nuxt-link>
          </p>

      </div>
    </div>
  </section>
</template>

<script>
import IconGithub from '~/components/Base/Icons/IconGithub'
import ConsentProfile from '~/components/Base/Consent/ConsentProfile'
import BaseLogout from '~/components/Base/Messages/BaseLogout'
export default {
  auth: false,
  layout: 'splash',
  components: {
    IconGithub,
    ConsentProfile,
    BaseLogout
  },
  data () {
    return {
      loading: false,
      error: false,
      success: false,
      reason: '',
      consent: false
    }
  },
  methods: {
    getHash: function() {
      let hashPosition
      if (this.$i18n.locale === this.$i18n.fallbackLocale) {
        hashPosition = 16
      } else {
        hashPosition = 19
      }
      return window.location.pathname.substr(hashPosition, 40)
    },
    deleteConfirmation: function() {
      this.$fs.api.data.delete('confirm/'+this.getHash())
      .catch((e) => {
        this.loading = false;
        this.error = true
        this.reason = e.response.data.reason
      })
      .then((i) => {
        if(!this.error) {
          this.loading = false;
          this.success = true;
          this.$router.push(this.$fs.path('/'))
        }
      })
    }, 
    createAccount: function() {
      this.$auth.loginWith('signup', {
        data: {
          hash: this.getHash()
        }
      })
      .catch((e) => {
        this.loading = false;
        this.error = true
        this.reason = e.response.data.reason
      })
      .then((i) => {
        if(!this.error) {
          this.loading = false;
          this.$router.push(this.$fs.path('/account/setup'))
        }
      })
    }, 
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
  border-radius: 5px;
}
</style>
