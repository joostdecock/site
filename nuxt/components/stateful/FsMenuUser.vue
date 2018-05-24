<template>
  <v-list :dense="dense" :class="dense ? 'fs-side-sub' : ''">
    <v-list-tile :to="$fs.path('/draft')">
      <v-list-tile-action>
        <v-icon>insert_drive_file</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('newDraft') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/model')">
      <v-list-tile-action>
        <v-icon>perm_identity</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('newModel') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile :to="$fs.path('/drafts')">
      <v-list-tile-action>
        <v-icon>folder_open</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('drafts') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/models')">
      <v-list-tile-action>
        <v-icon>perm_contact_calendar</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('models') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/account')">
      <v-list-tile-action>
        <v-icon>tune</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('settings') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.userPath($store.state.user.account.username)">
      <v-list-tile-action>
        <v-icon>fingerprint</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('profile') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile @click="$fs.logout()">
      <v-list-tile-action>
        <v-icon>power_settings_new</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('logOut') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'FsMenuUser',
  props: {
    dense: Boolean
  }
}
</script>

<style scope>
a.list__tile--active {
  background: rgba(0, 0, 0, .05)!important;
  border-right: 5px solid #212121;
}
</style>
