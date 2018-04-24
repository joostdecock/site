<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="computedDflt != value" @click.stop="resetDraftOption()" large color="accent">settings_backup_restore</v-icon>
        <v-icon large class="ml-2" color="secondary">help_outline</v-icon>
      </div>
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
            @change="updateDraftOption(name, value)"
            v-for="(value, index) in option.options" :key="index"
            :label="''+value" 
            :value="index"
            :color="(computedDflt != index) ? 'accent' : 'primary'"></v-radio>
        </v-radio-group>
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
    name: {
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
    resetDraftOption() {
      this.value = this.dflt
      this.$store.dispatch('draftOptionUpdate', {name: this.name, value: this.value} )
    },
    updateDraftOption(name, value) {
      this.$store.dispatch('draftOptionUpdate', {name: name, value: value} )
    }
  }
}
</script>
