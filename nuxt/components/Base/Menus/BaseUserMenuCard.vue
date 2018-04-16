<template>
  <v-card>
    <v-card-title class="fs-primary">
      <nuxt-link :to="$fs.path('/profile')" style="color: white; text-decoration: none;" >
        {{ $t('hi') }} @{{ $auth.user.account.username}}
      </nuxt-link>
    </v-card-title>
    <fs-user-menu />
      <v-divider></v-divider>
      <v-list-tile @click="logout">
        <v-list-tile-action>
          <v-icon color="error">power_settings_new</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('logOut') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
  </v-card>
</template>

<script>
import FsUserMenu from '~/components/Fs/Menus/FsUserMenu'
export default {
  components: {
    FsUserMenu,
  },
  name: 'BaseUserMenuCard',
  methods: {
    logout: function() {
      this.$auth.logout()
      this.$auth.reset()
    }
  }
}
</script>
