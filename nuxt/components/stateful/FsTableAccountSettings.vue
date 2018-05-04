<template>
  <div>
  <table class="table fs-info-table">
    <template v-for="(items, group) in fields">
    <thead :key="'thead-'+group">
      <tr :key="'theadrow-'+group">
      <th :key="'theadth-'+group" class="fs-titlerow" colspan="3">{{ $t(group) }}</th></tr>
    </thead>
    <tbody :key="'tbody-'+group">
      <template v-for="field in items">
      <tr v-if="editing == field" :key="'row1'+field">
        <td colspan="3" :key="'row1td'+field" class="fs-edit-inline">
          <fs-account-field-edit
            :field="field"
            :title="$t(field)"
            :value="getValue(field, group)"
            v-on:cancel="editing=''"
            v-on:update="notify($event)"
            />
        </td>
      </tr>
      <tr v-else :key="'row2'+field">
        <th :key="'row2td1'+field">{{ $t(field) }}</th>
        <td :key="'row2td2'+field">{{ getTitle(field, group) }}</td>
        <td :key="'row2td3'+field"><v-btn flat round outline color="accent" @click="editing=field">{{ $t('edit') }}</v-btn></td>
      </tr>
      </template>
    </tbody>
    </template>
  </table>
  <v-snackbar :timeout="(4000)" top right multi-line v-model="snackbar" >
    <v-icon class="mr-3" :color="notifyColor">{{ notifyIcon }}</v-icon>
    {{ msg }}
    <v-btn flat color="accent" @click.native="snackbar = false">{{ $t('close') }}</v-btn>
  </v-snackbar>
  </div>
</template>

<script>
import FsAccountFieldEdit from '~/components/stateful/FsAccountFieldEdit.vue'
export default {
  name: 'FsTableAccountSettings',
  components: {
    FsAccountFieldEdit
  },
  data () {
    return {
      editing: '',
      msg: '',
      notifyIcon: 'check',
      notifyColor: 'success',
      snackbar: false,
      fields: {
        data: ['username', 'email', 'password'],
        preferences: ['units', 'theme', 'locale'],
        social: ['twitter', 'instagram', 'github'],
      }
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
      }
      this.editing = ''
      this.snackbar = true
    },
    getValue: function(field, group) {
      if(group === 'social') {
        return this.$store.state.user.account.social[field]
      } else {
        return this.$store.state.user.account[field]
      }
    },
    getTitle: function(field, group) {
      if(group === 'preferences') {
        if(field === 'theme') {
          return this.$t(this.$store.state.user.account.theme+'Theme')
        }
        else if(field === 'units') {
          return this.$t(this.$store.state.user.account.units+'Units')
        }
        else if(field === 'locale') {
          for (let locale of this.$i18n.locales) {
            if(locale.code === this.$store.state.user.account.locale) {
              return locale.name
            }
          }
        }
      } else {
        return this.getValue(field, group)
      }
    }
  }

}
</script>
