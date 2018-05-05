<template>
  <div>
  <table class="table fs-info-table">
    <thead>
      <tr
        :style="(filter === 'none') ? '' : 'border-bottom: none'">
        <td class="text-xs-right">{{ $t('filterByPattern') }}</td>
        <td colspan="2">
		<v-select
      :items="patternList()"
      v-model="filter"
      single-line
      auto
      prepend-icon="chevron_right"
      hide-details
      class="py-4"
      @input="measurements = measurementList()"
    ></v-select>
        </td>
      </tr>
      <tr v-if="filter !== 'none'"
        style="border-bottom: 1px solid rgba(33,33,33,.12)"
        >
        <th colspan="3" class="text-xs-center">
          <p class="title fs-accent">{{ $t('measurementsRequiredForPattern', {pattern: $fs.ucfirst(filter)}) }}</p>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="field in measurementList()">
      <tr v-if="editing == field" :key="'row1'+field">
        <td colspan="3" :key="'row1td'+field" class="fs-edit-inline">
          <fs-model-field-edit
            :field="field"
            :title="$t(field)"
            :value="getValue(field)"
            :handle="model.handle"
            v-on:cancel="editing=''"
            v-on:update="notify($event)"
            />
        </td>
      </tr>
      <tr v-else :key="'row2'+field">
        <th :key="'row2td1'+field" :class="(typeof model.data.measurements[field] === 'undefined') ? 'fs-muted' : ''">{{ $t(field) }}</th>
        <td :key="'row2td2'+field">
          {{ (typeof model.data.measurements[field] === 'undefined') ? '-' : $fs.formatUnits(model.data.measurements[field], model.units, 'measure') }}
        </td>
        <td :key="'row2td3'+field">
          <v-btn flat round outline
            :color="(typeof model.data.measurements[field] === 'undefined') ? 'secondary' : 'accent'"
            @click="editing=field">
            {{ (typeof model.data.measurements[field] === 'undefined') ? $t('add') : $t('edit') }}
          </v-btn>
        </td>
      </tr>
      </template>
    </tbody>
  </table>
  <v-snackbar :timeout="(4000)" top right multi-line v-model="snackbar" >
    <v-icon class="mr-3" :color="notifyColor">{{ notifyIcon }}</v-icon>
    {{ msg }}
    <v-btn flat color="accent" @click.native="snackbar = false">{{ $t('close') }}</v-btn>
  </v-snackbar>
  </div>
</template>

<script>
import FsMeasurementFieldEdit from '~/components/stateful/FsMeasurementFieldEdit.vue'
export default {
  name: 'FsTableMeasurementsSettings',
  components: {
    FsMeasurementFieldEdit
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editing: '',
      msg: '',
      notifyIcon: 'check',
      notifyColor: 'success',
      snackbar: false,
      items: ['name', 'breasts', 'shared'],
      filter: 'none',
      measurements: this.patternList()
    }
  },
  methods: {
    notify: function(msg) {
      if(msg === 'no_changes') {
        this.notifyIcon = 'info_outline'
        this.notifyColor = 'white'
        this.msg = this.$t('noChanges')
      } else {
        this.notifyIcon = 'check'
        this.notifyColor = 'success'
        this.msg = msg
        this.$emit('updated')
      }
      this.editing = ''
      this.snackbar = true
    },
    getValue: function(field) {
      if(field === 'name') {
        return this.model.name
      } else {
        return (this.model[field] == 1) ? 1 : 0
      }
    },
    getTitle: function(field) {
      if(field === 'breasts') {
        return (this.model[field] == 1) ? this.$t('withBreasts') : this.$t('withoutBreasts')
      }
      else if(field === 'shared') {
        return (this.model[field] == 1) ? this.$t('shared') : this.$t('notShared')
      }
      else {
        return this.model[field]
      }
    },
    patternList: function() {
      let patterns = [{value: 'none', text: this.$t('noFilter')}]
      for (let p in this.$fs.conf.mapping.handleToPattern) {
        patterns.push({value: p, text: this.$fs.ucfirst(p)})
      }
      return patterns
    },
    measurementList: function() {
      if(this.filter === 'none') {
        return Object.keys(this.$fs.conf.measurements)
      } else {
        console.log(this.filter)
        let measurements = []
        for(let m in this.$fs.conf.patterns[this.filter].measurements) {
          measurements.push(m)
        }
        return measurements
      }

      let measurements = {}
      for(let m in this.model.data.measurements) {
        measurements[m] = this.model.data.measurements[m]
      }
      console.log(measurements)
      for(let m in this.$fs.conf.measurements) {
        if(typeof measurements[m] === 'undefined') {
          measurements[m] = ''
        }
      }
      return measurements
    }
  }

}
</script>
