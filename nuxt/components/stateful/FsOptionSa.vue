<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="(computedDflt != value || customSa != customSaDflt)" @click.stop="resetDraftSa()" large color="accent">settings_backup_restore</v-icon>
        <v-icon v-if="help" large class="ml-2" color="secondary" @click.stop="help=!help">cancel</v-icon>
        <v-icon v-else large class="ml-2" color="secondary" @click.stop="help=!help">help_outline</v-icon>
      </div>
      <h6>
        <span :class="(computedDflt != value || customSa != customSaDflt) ? 'fs-option-custom' : ''">
          {{ $t('txt-saOption-'+value) }}
        </span>
        <span :class="(customSa === customSaDflt)? '' : 'fs-option-custom'" v-if="value === 'custom'">({{$fs.formatUnits(customSa, $store.state.user.account.units, 'measure')}})</span>
      </h6>
      <fs-option-help v-if="help" option="sa" pattern="draft" />
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
         :color="(customSa != customSaDflt) ? 'accent' : 'primary'"
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
import FsOptionHelp from '~/components/stateless/FsOptionHelp'
export default {
  name: 'FsOptionSa',
  components: {
    FsOptionHelp,
  },
  data: function() {
    let computedDflt = this.$store.state.user.account.units
    let options = {
      none: 0,
      metric: 1,
      imperial: 0,
      custom: 1
    }
    let pattern = this.$store.state.draft.defaults.pattern
    if (typeof this.$fs.conf.patterns[pattern].seamAllowance !== 'undefined') {
      options.patternMetric = this.$fs.conf.patterns[pattern].seamAllowance.metric
      options.patternImperial = this.$fs.conf.patterns[pattern].seamAllowance.imperial
      computedDflt = 'pattern'+this.$fs.ucfirst(computedDflt)
    }
    let customSaDflt = 0
    if(this.$store.state.draft.defaults.draftOptions.sa.type === 'custom') {
      customSaDflt = this.$store.state.draft.defaults.draftOptions.sa.value
    } else {
      customSaDflt = this.$fs.conf.defaults.sa[this.$store.state.user.account.units]
    }
    let customSaMin = 0
    let customSaMax = 0
    if(this.$store.state.user.account.units === 'imperial') {
      customSaMin = 0.25
      customSaMax = 2
    } else {
      customSaMin = 0.5
      customSaMax = 2.5
    }
    return {
      computedDflt: this.$store.state.draft.defaults.draftOptions.sa.type,
      value: this.$store.state.draft.defaults.draftOptions.sa.type,
      options: options,
      customSaDflt: customSaDflt,
      customSa: customSaDflt,
      customSaMin: customSaMin,
      customSaMax: customSaMax,
      help: false
    }
  },
  methods: {
    resetDraftSa() {
      this.value = this.computedDflt
      this.customSa = this.customSaDflt
      this.$store.commit('setDraftSa', {type: this.value, value: this.options[this.value]} )
    },
    updateDraftSa(type, value) {
      this.$store.commit('setDraftSa', {type: type, value: value} )
    }
  }
}
</script>
