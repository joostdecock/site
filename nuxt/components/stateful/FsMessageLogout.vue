<template>
  <div>
    <h3>{{ $t('thisPageIsNotIntendedForLoggedInUsers') }}</h3>
    <p>
      {{ $t('youAreCurrentlyLoggedIn') }}
      {{ $t('wouldYouLikeToLogOut') }}
    </p>
    <v-btn @click="logout" large color="primary" class="mb-3 mt-3">
      <v-icon class="mr-3">power_settings_new</v-icon>
      {{ $t('logOut') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'FsMessageLogout',
  methods: {
    logout: function() {
      this.$fs.logout()
    }
  }
}
</script>

