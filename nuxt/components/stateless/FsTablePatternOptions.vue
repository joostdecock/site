<template>
  <div>
  <table class="table fs-info-table">
    <template v-for="(group, gkey) in $fs.conf.patterns[$fs.patternHandle(draft.pattern)].optiongroups">
      <tr :key="gkey">
        <th colspan="2">{{ $t(gkey) }}</th>
      </tr>
      <tr v-for="option in group" :key="option">
        <th>{{ $t(option) }}</th>
        <td>{{ $fs.formatPatternOption(
          draft.data.options[option],
          option,
          $fs.patternHandle(draft.pattern),
          $store.state.user.account.units
          ) }}
        </td>
      </tr>
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
  }
}
</script>
