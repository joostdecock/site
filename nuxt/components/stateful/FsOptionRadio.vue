<template>
  <v-expansion-panel-content>
    <div slot="header">
      <div class="fs-state-icons mr-3">
        <v-icon v-if="computedDflt != value" @click.stop="resetDraftOption()" large color="accent">settings_backup_restore</v-icon>
        <v-icon v-if="help" large class="ml-2" color="secondary" @click.stop="help=!help">cancel</v-icon>
        <v-icon v-else large class="ml-2" color="secondary" @click.stop="help=!help">help_outline</v-icon>
      </div>
      <h6>{{ option.title }}:
        <span :class="(computedDflt != value) ? 'fs-option-custom' : ''">
          {{ option.options[value] }}
        </span>
      </h6>
      <fs-option-help v-if="help" :option="name" :pattern="pattern" />
    </div>
    <v-card>
      <v-card-text>
        <v-radio-group v-model="value">
				  <v-radio
            @change="updateDraftOption(name, index)"
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
import FsOptionHelp from '~/components/stateless/FsOptionHelp'
export default {
  name: 'FsOptionRadio',
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
      type: [String, Number],
      required: true
    }
  },
  data: function() {
    return {
      value: ''+this.dflt,
      computedDflt: ''+this.dflt,
      help: false
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
