<template>
  <div>
    <h3>{{ $t('thisPageIsNotIntendedForLoggedInUsers') }}</h3>
    <p>
      {{ $t('youAreCurrentlyLoggedIn') }}
      {{ $t('wouldYouLikeToLogOut') }}
    </p>
    <v-btn @click="logout" large color="primary" class="mb-3">
      <v-icon class="mr-3">power_settings_new</v-icon>
      {{ $t('logOut') }}
    </v-btn>
    <v-btn large class="mb-3" @click="$router.go(-1)">
      <v-icon class="mr-3">undo</v-icon>
      {{ $t('cancel') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'FsMessageLogout',
  methods: {
    logout: function() {
      this.$auth.logout()
      this.$auth.reset()
    }
  }
}
</script>

