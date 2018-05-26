<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator" class="ml-0">
      <v-btn flat class="fs-ucase fs-m0">
        {{ $t('community') }}
        <v-icon color="secondary" style="text-transform: initial!important">arrow_drop_down</v-icon>
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
