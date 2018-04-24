<template>
  <v-expansion-panel-content>
    <div slot="header">
      <h6>{{ $t('theme') }}: 
        <span :class="(dflt != value) ? 'fs-option-custom' : ''">
          {{ $t('theme-'+value) }}
        </span>
      </h6>
    </div>
    <v-card>
      <v-card-text>
        <v-radio-group v-model="value"
          >
				  <v-radio
            @change="updateDraftTheme(theme)"
            v-for="theme in ['classic', 'paperless']" :key="theme"
            :label="$t('theme-'+theme)" 
            :value="theme"
            :color="(theme != dflt) ? 'accent' : 'primary'"></v-radio>
        </v-radio-group>
        <p class="text-xs-right">
        <v-btn flat large outline color="accent"
          v-if="dflt != theme"
          @click="resetDraftTheme()">
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
