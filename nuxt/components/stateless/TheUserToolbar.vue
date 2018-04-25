<template>
  <v-toolbar flat color="white">
    <v-spacer></v-spacer>
    <nuxt-link :to="$fs.path('/draft')">
      <v-btn large flat>
        <v-icon class="mr-3" color="success">insert_drive_file</v-icon>
        {{ $t('newDraft') }}
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="$fs.path('/model')">
      <v-btn large flat>
        <v-icon class="mr-3" color="accent">perm_identity</v-icon>
        {{ $t('newModel') }}
      </v-btn>
    </nuxt-link>
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


