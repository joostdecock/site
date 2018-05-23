<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="computedDflt != value" @click.stop="resetDraftOption()" large color="accent">settings_backup_restore</v-icon>
        <v-icon v-if="help" large class="ml-2" color="secondary" @click.stop="help=!help">cancel</v-icon>
        <v-icon v-else large class="ml-2" color="secondary" @click.stop="help=!help">help_outline</v-icon>
      </div>
      <h6>{{ option.title }}:
        <span :class="(computedDflt != value) ? 'fs-option-custom' : ''" v-html="$fs.formatUnits(value, $store.state.user.account.units, option.type)">
        </span>
      </h6>
      <fs-option-help v-if="help" :option="name" :pattern="pattern" />
    </div>
    <v-card>
      <v-card-text>
        <v-slider
         @input="updateDraftOption(name, value)"
         :color="(computedDflt != value) ? 'accent' : 'primary'"
         :min="min"
         :max="max"
         v-model="value"
         :step="step">
        </v-slider>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import FsOptionHelp from '~/components/stateless/FsOptionHelp'
export default {
  name: 'FsOptionSlider',
  components: {
    FsOptionHelp,
  },
  props: {
    pattern: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: true
    },
    dflt: {
      type: Number,
      required: true
    }
  },
  data: function() {
    let units = this.$store.state.user.account.units
    let computedDflt = this.dflt
    let min = this.option.min || 0
    let max = this.option.max || 100
    let step = 1
    let scale = 1
    if(this.option.type === 'measure') {
      step = this.$fs.conf.defaults.step[units]
      scale = this.$fs.conf.defaults.scale[units]
      computedDflt =  this.$fs.sliderRound(this.dflt, units)
      min = this.$fs.sliderRound(this.option.min)
      max = this.$fs.sliderRound(this.option.max)
    }
    return {
      value: computedDflt,
      computedDflt: computedDflt,
      min: min,
      max: max,
      step: step,
      help: false
    }
  },
  methods: {
    resetDraftOption() {
      this.value = this.computedDflt
      this.$store.dispatch('draftOptionUpdate', {name: this.name, value: this.value} )
      this.$fs.updateDraftCustomOptionsCount()
    },
    updateDraftOption(name, value) {
      this.$store.dispatch('draftOptionUpdate', {name: name, value: value} )
      this.$fs.updateDraftCustomOptionsCount()
    }
  }
}
</script>
