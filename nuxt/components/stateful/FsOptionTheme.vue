<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="dflt != value" @click.stop="resetDraftTheme()" large color="accent">settings_backup_restore</v-icon>
        <v-icon large class="ml-2" color="secondary">help_outline</v-icon>
      </div>
      <h6><span :class="(dflt != value) ? 'fs-option-custom' : ''">
          {{ $t(value+'Theme') }}
      </span></h6>
    </div>
    <v-card>
      <v-card-text>
        <v-radio-group v-model="value"
          >
				  <v-radio
            @change="updateDraftTheme(theme)"
            v-for="theme in ['classic', 'paperless']" :key="theme"
            :label="$t(theme+'Theme')" 
            :value="theme"
            :color="(theme != dflt) ? 'accent' : 'primary'"></v-radio>
        </v-radio-group>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: 'FsOptionTheme',
  props: {
    dflt: {
      type: String,
      default: 'classic'
    }
  },
  data: function() {
    return {
      value: this.dflt
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
