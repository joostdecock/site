<template>
  <v-expansion-panel-content>
    <div slot="header">
      <h6>{{ option.title }}: 
        <span :class="(computedDflt != value) ? 'fs-option-custom' : ''">
          {{ option.options[value] }}
        </span>
      </h6>
    </div>
    <v-card>
      <v-card-text>
        <v-radio-group v-model="value">
				  <v-radio
            @input="updateDraftOption(name, val)"
            v-for="(value, index) in option.options" :key="index"
            :label="''+value" 
            :value="index"
            :color="(computedDflt != index) ? 'accent' : 'primary'"></v-radio>
        </v-radio-group>
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
  name: 'FsOptionRadio',
  props: {
    pattern: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: true
    },
    dflt: {
      type: String,
      required: true
    }
  },
  data: function() {
    return { 
      value: ''+this.dflt, 
      computedDflt: ''+this.dflt 
    }
  },
  methods: {
    updateDraftOption(name, value) {
        this.$store.commit('setDraftOption', {name: name, value: value} )
    }
  }
}
</script>
