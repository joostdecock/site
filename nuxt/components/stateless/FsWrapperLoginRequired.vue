<template>
  <div>
    <blockquote v-if="!$store.state.user.loggedIn">
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
          <v-btn :to="$fs.path('/login')" large color="primary" class="mb-3">
            <v-icon class="mr-3">vpn_key</v-icon>
            {{ $t('logIn') }}
          </v-btn>
          <v-btn large class="mb-3" :to="$fs.path('/signup')" color="success">
            <v-icon class="mr-3">person_add</v-icon>
            {{ $t('signUp') }}
          </v-btn>
        </div>
      </div>
    </blockquote>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FsWrapperLoginRequired',
  props: {
    callback: {
      type: Function,
      required: false
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

