<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator">
      <v-btn large flat>
        <v-icon class="mr-3" color="info">extension</v-icon>
        {{ $t('community') }}
        <v-icon color="secondary">arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar-title>
    <fs-menu-community />
  </v-menu>
</template>

<script>
import FsMenuCommunity from '~/components/stateless/FsMenuCommunity'

export default {
  name: 'TheCommunityDropdownMenu',
  components: { FsMenuCommunity }
}
</script>
