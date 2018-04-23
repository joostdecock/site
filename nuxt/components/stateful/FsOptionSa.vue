<template>
  <v-expansion-panel-content>
    <div slot="header">
      <h6>{{ $t('seamAllowance') }}: 
        <span :class="(computedDflt != value) ? 'fs-option-custom' : ''">
          {{ $t('txt-saOption-'+value) }}
        </span>
      </h6>
      Local value: {{ value }}<br>
      Store value: {{ $store.state.draft.config.sa.type }}
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
        <p class="text-xs-right">
        <v-btn flat large outline color="accent"
          v-if="computedDflt != value"
          @click="resetDraftSa()">
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
  name: 'FsOptionRadio',
  props: {
    pattern: {
      type: Object,
      required: true
    }
  },
  data: function() {
    let computedDflt = this.$auth.user.account.units
    let options = {
      none: 0,
      metric: 1,
      imperial: 0,
      custom: 1
    }
    if (typeof this.pattern.seamAllowance !== 'undefined') {
      options.push({type: 'patternMetric', value: this.pattern.seamAllowance.metric})
      options.push({type: 'patternImperial', value: this.pattern.seamAllowance.imperial})
      computedDflt = 'pattern'.computedDflt
    }
    return {
      computedDflt: computedDflt,
      value: computedDflt,
      options: options,
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
