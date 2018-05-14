<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="computedDflt != value" @click.stop="resetDraftSa()" large color="accent">settings_backup_restore</v-icon>
        <v-icon large class="ml-2" color="secondary">help_outline</v-icon>
      </div>
      <h6>
        <span :class="(computedDflt != value) ? 'fs-option-custom' : ''">
          {{ $t('txt-saOption-'+value) }}
        </span>
        <span class="fs-option-custom" v-if="value === 'custom'">({{customSa}})</span>
      </h6>
    </div>
    <v-card>
      <v-card-text>
        <v-radio-group v-model="value"
          >
				  <v-radio
            @change="updateDraftSa(index, value)"
            v-for="(value, index) in options" :key="index"
            :label="$t('txt-saOption-'+index)"
            :value="index"
            :color="(computedDflt != index) ? 'accent' : 'primary'"></v-radio>
        </v-radio-group>
        <v-slider
        v-if="value === 'custom'"
         @input="updateDraftSa('custom', customSa)"
         :color="(computedDflt != value) ? 'accent' : 'primary'"
         :min="customSaMin"
         :max="customSaMax"
         v-model="customSa"
         :step="$fs.conf.defaults.step[$store.state.user.account.units]">
        </v-slider>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: 'FsOptionSa',
  props: {
    pattern: {
      type: Object,
      required: true
    }
  },
  data: function() {
    let computedDflt = this.$store.state.user.account.units
    let options = {
      none: 0,
      metric: 1,
      imperial: 0,
      custom: 1
    }
    if (typeof this.pattern.seamAllowance !== 'undefined') {
      options.patternMetric = this.pattern.seamAllowance.metric
      options.patternImperial = this.pattern.seamAllowance.imperial
      computedDflt = 'pattern'+this.$fs.ucfirst(computedDflt)
    }
    let customSaDflt = 0
    let customSaMin = 0
    let customSaMax = 0
    if(this.$store.state.user.account.units === 'imperial') {
      customSaDflt = 1
      customSaMin = 0.25
      customSaMax = 2
    } else {
      customSaDflt = (5/8)
      customSaMin = 0.5
      customSaMax = 2.5
    }
    return {
      computedDflt: computedDflt,
      value: computedDflt,
      options: options,
      customSaDflt: customSaDflt,
      customSa: customSaDflt,
      customSaMin: customSaMin,
      customSaMax: customSaMax,
    }
  },
  methods: {
    resetDraftSa() {
      this.value = this.computedDflt
      this.$store.commit('setDraftSa', {type: this.value, value: this.options[this.value]} )
    },
    updateDraftSa(type, value) {
      this.$store.commit('setDraftSa', {type: type, value: value} )
    }
  }
}
</script>
