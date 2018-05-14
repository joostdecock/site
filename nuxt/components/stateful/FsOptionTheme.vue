<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="value != dfltValue" @click.stop="resetDraftTheme()" large color="accent">settings_backup_restore</v-icon>
        <v-icon large class="ml-2" color="secondary">help_outline</v-icon>
      </div>
      <h6><span :class="(value != dfltValue) ? 'fs-option-custom' : ''">
          {{ $t(value.toLowerCase()+'Theme') }}
      </span></h6>
    </div>
    <v-card>
      <v-card-text>
        <v-radio-group v-model="value"
          >
				  <v-radio
            @change="updateDraftTheme(theme)"
            v-for="theme in $fs.conf.defaults.themes" :key="theme"
            :label="$t(theme.toLowerCase()+'Theme')"
            :value="theme"
            :color="(theme != dfltValue) ? 'accent' : 'primary'"></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: 'FsOptionTheme',
  data: function() {
    let d = this.$fs.normalize(this.$store.state.draft.defaults)
    return {
      value: d.draftOptions.theme,
      dfltValue: d.draftOptions.theme
    }
  },
  methods: {
    resetDraftTheme() {
      this.value = this.dflt
      this.$store.commit('setDraftTheme', this.dflt )
    },
    updateDraftTheme(value) {
      this.$store.commit('setDraftTheme', value )
    }
  }
}
</script>
