<template>
  <div>
    <blockquote v-if="!$store.state.user.loggedIn" class="fs-bq skully">
      <div v-if="!$store.state.user.isFresh">
        <h3>{{ $t('justAMoment') }}</h3>
        <p>{{ $t('weAreLoadingDataFromTheBackend') }}</p>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else>
        <h3>{{ $t('youAreNotLoggedIn') }}</h3>
        <p>
        {{ $t('thisPageIsOnlyAvailableToFreesewingUsers') }}
        </p>
        <div class="mt-5">
          <v-btn :to="$fs.path('/login')" large color="success" class="mb-3">
            <v-icon class="mr-3">vpn_key</v-icon>
            {{ $t('logIn') }}
          </v-btn>
          <v-btn large class="mb-3" :to="$fs.path('/signup')" color="accent">
            <v-icon class="mr-3">person_add</v-icon>
            {{ $t('signUp') }}
          </v-btn>
        </div>
      </div>
    </blockquote>
    <div v-else>
      <div v-if="$store.state.user.account.consent.profile != 1">
        <fs-consent-gdpr :intro="(true)" :profile="(true)" :model="(false)" />
      </div>
      <div v-else-if="$store.state.user.account.consent.model != 1 && needsmodel">
        <fs-consent-gdpr :intro="(true)" :profile="(false)" :model="(true)" />
      </div>
      <div v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import FsConsentGdpr from '~/components/stateless/FsConsentGdpr'
export default {
  name: 'FsWrapperLoginRequired',
  components: {
    FsConsentGdpr
  },
  props: {
    callback: {
      type: Function,
      required: false
    },
    needsmodel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      callbackRan: false
    }
  },
  computed: {
    authCompleted () {
      if(typeof this.$store.state.user.account.id !== 'undefined') {
        this.runCallback()
        return this.$store.state.user.isFresh
      } else {
        return false
      }
    }
  },
  watch: {
    authCompleted: function () {
      this.runCallback()
    }
  },
  methods: {
    runCallback: function() {
      if(typeof this.callback !== 'undefined' && !this.callbackRan) {
        this.callback()
        this.callbackRan = true
      }
    }
  }
}
</script>

<style scoped>
blockquote {
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
}
</style>

