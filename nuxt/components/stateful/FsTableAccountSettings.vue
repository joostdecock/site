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
          <fs-account-field-edit :field="field" :title="$t(field)" :value="$store.state.user.account[field]" v-on:cancel="editing=''" />
        </td>
      </tr>
      <tr v-else :key="'row2'+field">
        <th :key="'row2td1'+field">{{ $t(field) }}</th>
        <td :key="'row2td2'+field">{{ $store.state.user.account[field] }}</td>
        <td :key="'row2td3'+field"><v-btn flat round outline color="accent" @click="editing=field">edit</v-btn></td>
      </tr>
      </template>
    </tbody>
    </template>
  </table>
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
      fields: {
        data: ['username', 'email', 'password'],
        defaults: ['units', 'theme', 'language'],
        social: ['twitter', 'instagram', 'github']
      }
    }
  }
}
</script>
