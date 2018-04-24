<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="scope != value" @click.stop="resetDraftScope()" large color="accent">settings_backup_restore</v-icon>
        <v-icon large class="ml-2" color="secondary">help_outline</v-icon>
      </div>
      <h6><span :class="(scope != value) ? 'fs-option-custom' : ''">
          {{ (value === 'pattern') ? $t('completePattern') : $t('onlySelectedPatternParts') }}
      </span></h6>
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
            :color="(scope != value) ? 'accent' : 'primary'"></v-radio>
        </v-radio-group>
        <div v-if="value === 'parts'">
          <p>{{ $t('selectThePartsYouWantIncludedInYourDraft') }}</p>
          <v-checkbox
            v-for="part in Object.keys(pattern.parts)"
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
export default {
  name: 'FsOptionScope',
  props: {
    pattern: {
      type: Object,
      required: true
    },
    scope: {
      type: String,
      default: 'pattern'
    }
  },
  data: function() {
    return { 
      value: this.scope,
      included: this.pattern.parts
    }
  },
  methods: {
    resetDraftScope() {
      this.value = this.scope
      this.$store.commit('setDraftScope', {type: this.scope, included: this.pattern.parts} )
    },
    updateDraftScope(type) {
      console.log(type)
      this.$store.commit('setDraftScope', {type: type, included: this.included} )
    },
    scopeSetAll: function(val) {
      for (let part in this.pattern.parts) {
        this.included[part] = val
      }
    }
  }
}
</script>
