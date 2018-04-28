<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator">
      <v-btn flat>
        <v-avatar :size="(24)" class="mr-3">
          <img :src="$fs.conf.api.data+$store.state.user.account.pictureSrc" :alt="$store.state.user.account.username">
        </v-avatar>
        {{ '@'+$store.state.user.account.username }}
        <v-icon color="primary">arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar-title>
    <fs-menu-user />
  </v-menu>
</template>

<script>
import FsMenuUser from '~/components/stateful/FsMenuUser'

export default {
  name: 'TheUserDropdownMenu',
  components: { FsMenuUser }
}
</script>
