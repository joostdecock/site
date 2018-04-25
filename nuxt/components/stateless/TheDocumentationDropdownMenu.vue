<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator">
      <v-btn large flat>
        <v-icon class="mr-3" color="info">import_contacts</v-icon>
        {{ $t('documentation') }}
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar-title>
    <fs-menu-documentation />
  </v-menu>
</template>

<script>
import FsMenuDocumentation from '~/components/stateless/FsMenuDocumentation'

export default {
  name: 'TheDocumentationDropdownMenu',
  components: { FsMenuDocumentation }
}
</script>

