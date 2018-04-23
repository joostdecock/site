<template>
  <v-expansion-panel-content>
    <div slot="header">
      <h6>{{ option.title }}: 
        <span :class="(computedDflt != value) ? 'fs-option-custom' : ''">
          {{ $fs.units.format(value, $auth.user.units, option.type) }}
        </span>
      </h6>
    </div>
    <v-card>
      <v-card-text>
        <v-slider
         @input="updateDraftOption(name, val)"
         :color="(computedDflt != value) ? 'accent' : 'primary'"
         :min="min" 
         :max="max" 
         v-model="value"
         :step="step">
        </v-slider>
        <p class="text-xs-right">
        <v-btn flat large outline color="accent"
          v-if="computedDflt != value"
          @click="value = computedDflt">
          {{ $t('resetToDefault') }}
        </v-btn>
        <v-btn flat large outline>{{ $t('showHelp') }}</v-btn>
        </p>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: 'FsOptionSlider',
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
    let computedDflt = this.dflt
    let min = this.option.min || 0
    let max = this.option.max || 100
    let step = 1
    if(this.option.type === 'measure') {
      computedDflt =  (this.$auth.user.account.units === 'imperial') ? this.dflt/25.4 : this.dflt/10
      min = (this.$auth.user.account.units === 'imperial') ? this.option.min/25.4 : this.option.min/10
      max = (this.$auth.user.account.units === 'imperial') ? this.option.max/25.4 : this.option.max/10
      step = 0.1
    }
    return { 
      value: computedDflt, 
      computedDflt: computedDflt,
      min: min,
      max: max,
      step: step
    }
  },
  methods: {
    updateDraftOption(name, value) {
        this.$store.commit('setDraftOption', {name: name, value: value} )
    }
  }
}
</script>
