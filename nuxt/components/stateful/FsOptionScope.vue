<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="value != dfltValue" @click.stop="resetDraftScope()" large color="accent">settings_backup_restore</v-icon>
        <v-icon v-if="help" large class="ml-2" color="secondary" @click.stop="help=!help">cancel</v-icon>
        <v-icon v-else large class="ml-2" color="secondary" @click.stop="help=!help">help_outline</v-icon>
      </div>
      <h6><span :class="(value != dfltValue) ? 'fs-option-custom' : ''">
          {{ (value === 'pattern') ? $t('completePattern') : $t('onlySelectedPatternParts') }}
      </span></h6>
      <fs-option-help v-if="help" option="scope" pattern="draft" />
    </div>
    <v-card>
      <v-card-text>
        <v-radio-group v-model="value"
          >
				  <v-radio
            @change="updateDraftScope(value)"
            v-for="value in ['pattern', 'parts']" :key="value"
            :label="(value === 'pattern') ? $t('completePattern') : $t('onlySelectedPatternParts')"
            :value="value"
            :color="(value != dfltValue) ? 'accent' : 'primary'"></v-radio>
        </v-radio-group>
        <div v-if="value === 'parts'">
          <p>{{ $t('selectThePartsYouWantIncludedInYourDraft') }}</p>
          <v-checkbox
            v-for="part in Object.keys($fs.conf.patterns[pattern].parts)"
            @change="updateDraftScope('parts')"
            :key="part"
            :label="part"
            hide-details
            v-model="included[part]"></v-checkbox>
          <div class="mt-3">
            <v-btn flat @click="scopeSetAll(true)">Check all</v-btn>
            <v-btn flat @click="scopeSetAll(false)">Clear all</v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import FsOptionHelp from '~/components/stateless/FsOptionHelp'
export default {
  name: 'FsOptionScope',
  components: {
    FsOptionHelp,
  },
  data: function() {
    let d = this.$fs.normalize(this.$store.state.draft.defaults)
    return {
      value: d.draftOptions.scope.type,
      dfltValue: d.draftOptions.scope.type,
      included: d.draftOptions.scope.included,
      dfltIncluded: d.draftOptions.scope.included,
      pattern: d.pattern,
      help: false
    }
  },
  methods: {
    resetDraftScope() {
      this.value = this.dfltValue
      this.included = this.dfltIncluded
      this.$store.commit('setDraftScope', {type: this.value, included: this.included} )
    },
    updateDraftScope(type) {
      let parts = {}
      for(let part in this.included) {
        if (this.included[part] !== false) {
          parts[part] = true
        }
      }
      this.$store.commit('setDraftScope', {type: this.value, included: parts} )
    },
    scopeSetAll: function(val) {
      let parts = {}
      for (let part in this.$fs.conf.patterns[this.pattern].parts) {
        this.included[part] = val
        if(val === true) parts[part] = true
      }
      this.$store.commit('setDraftScope', {type: this.value, included: parts} )
    }
  }
}
</script>
