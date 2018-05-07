<template>
  <div>
  <table class="table fs-info-table">
    <template v-for="(group, gkey) in $fs.conf.patterns[$fs.patternHandle(draft.pattern)].optiongroups">
      <thead :key="'thead-'+gkey">
      <tr :key="gkey">
        <th class="fs-titlerow" colspan="2">{{ $t(gkey) }}</th>
      </tr>
      </thead>
      <tbody :key="'tbody-'+gkey">
      <tr v-for="option in group" :key="option">
        <th class="fs-wp50">{{ $t(option) }}</th>
        <td v-html="$fs.formatPatternOption( options[option], option, $fs.patternHandle(draft.pattern), $store.state.user.account.units)">
        </td>
      </tr>
      </tbody>
    </template>
  </table>
  </div>
</template>

<script>
export default {
  name: 'FsTablePatternOptions',
  props: {
    draft: {
      type: Object,
      required: true
    }
  },
  data: function() {
    if(typeof this.draft.data.options.patternOptions === 'undefined') {
      // Drafted prior to site v2
      return {options: this.draft.data.options}
    } else {
      return {options: this.draft.data.options.patternOptions}
    }
  }
}
</script>
