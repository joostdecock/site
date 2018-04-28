<template>
  <v-toolbar flat color="transparent">
    <v-spacer></v-spacer>
    <v-btn flat :to="$fs.path('/draft')">
      <v-icon class="mr-3" color="success">insert_drive_file</v-icon>
      {{ $t('newDraft') }}
    </v-btn>
    <v-btn flat :to="$fs.path('/model')">
      <v-icon class="mr-3" color="accent">perm_identity</v-icon>
      {{ $t('newModel') }}
    </v-btn>
    <the-account-dropdown-menu />
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
import TheAccountDropdownMenu from '~/components/stateless/TheAccountDropdownMenu'

export default {
  name: 'TheUserToolbar',
  components: {
    TheAccountDropdownMenu
  }
}
</script>


