<template>
  <div>
  <table class="table fs-info-table">
    <tbody>
      <template v-for="field in items">
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
        <th :key="'row2td1'+field">{{ (field === 'shared') ? $t('share') : $t(field) }}</th>
        <td :key="'row2td2'+field">{{ getTitle(field) }}</td>
        <td :key="'row2td3'+field"><v-btn flat round outline color="accent" @click="editing=field">{{ $t('edit') }}</v-btn></td>
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
import FsModelFieldEdit from '~/components/stateful/FsModelFieldEdit.vue'
export default {
  name: 'FsTableModelSettings',
  components: {
    FsModelFieldEdit
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
    }
  }

}
</script>
