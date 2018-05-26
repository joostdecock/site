<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator" class="ml-0">
      <v-btn flat class="fs-ucase fs-m0">
        {{ $t('documentation') }}
        <v-icon color="secondary" style="text-transform: initial!important">arrow_drop_down</v-icon>
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

