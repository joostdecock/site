<template>
  <v-list>
    <v-list-tile :to="$fs.path('/draft')">
      <v-list-tile-action>
        <v-icon color="info">insert_drive_file</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('newDraft') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/model')">
      <v-list-tile-action>
        <v-icon color="accent">perm_identity</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('newModel') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider />
    <v-list-tile :to="$fs.path('/drafts')">
      <v-list-tile-action>
        <v-icon color="primary">folder</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('drafts') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/models')">
      <v-list-tile-action>
        <v-icon color="primary">perm_contact_calendar</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('models') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="$fs.path('/account')">
      <v-list-tile-action>
        <v-icon color="primary">settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('settings') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'TheUserMenu',
    data () {
      return {
        items: [
          { icon: 'folder', title: 'yourDrafts', to: '/drafts' },
          { icon: 'perm_contact_calendar', title: 'yourModels', to: '/models' },
          { icon: 'insert_drive_file', title: 'newDraft', to: '/draft' },
          { icon: 'perm_identity', title: 'newModel', to: '/model' },
          { icon: 'settings', title: 'accountSettings', to: '/account' },
        ],
      }
    },
  }
</script>

<style scope>
a.list__tile--active {
  background: rgba(0, 0, 0, .05)!important;
  font-weight: bold;
  border-right: 5px solid #212121;
}
</style>
