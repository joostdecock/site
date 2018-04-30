<template>
  <v-toolbar flat color="transparent">
    <v-spacer></v-spacer>
    <v-btn color="success"><v-icon class="mr-3">call_split</v-icon>{{ $t('fork') }}</v-btn>
    <v-btn color="accent"><v-icon class="mr-3">repeat</v-icon>{{ $t('redraft') }}</v-btn>
    <v-menu>
      <div slot="activator">
        <v-btn color="primary">
          <v-icon class="mr-3">archive</v-icon>
          {{ $t('download') }}
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
      </div>
  <v-list>
      <v-list-tile :href="$fs.draftDownloadLink(draft.handle, 'svg')">
        <v-list-tile-action><v-icon color="info">code</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('svgSourceCode') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile v-for="f in iso" :href="$fs.draftDownloadLink(draft.handle, f.format)" :key="f.format">
        <v-list-tile-action><v-icon color="primary">insert_drive_file</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t(f.title) }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile v-for="f in us" :href="$fs.draftDownloadLink(draft.handle, f.format)" :key="f.format">
        <v-list-tile-action><v-icon>insert_drive_file</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t(f.title) }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-menu>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
export default {
  name: 'FsToolbarDraft',
  props: {
    draft: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      iso: [
        { format: 'a4.pdf', 'title': 'A4 PDF' },
        { format: 'a3.pdf', 'title': 'A3 PDF' },
        { format: 'a2.pdf', 'title': 'A2 PDF' },
        { format: 'a1.pdf', 'title': 'A1 PDF' },
        { format: 'a0.pdf', 'title': 'A0 PDF' },
        { format: 'pdf', 'title': this.$t('fullSizePdf') },
      ],
      us: [
        { format: 'letter', 'title': this.$t('letterPdf') },
        { format: 'tabloid', 'title': this.$t('tabloidPdf') },
      ]
    }
  }
}
</script>

