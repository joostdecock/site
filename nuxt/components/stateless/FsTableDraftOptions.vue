<template>
  <div>
  <table class="table fs-info-table">
      <tr>
        <th>{{ $t('seamAllowance') }}</th>
        <td>{{ draft.data.options.seamAllowance }}</td>
      </tr>
      <tr>
        <th>{{ $t('scope') }}</th>
        <td>{{ draft.data.options.scope }}</td>
      </tr>
      <tr>
        <th>{{ $t('layout') }}</th>
        <td>{{ draft.data.options.theme }}</td>
      </tr>
  </table>
  </div>
</template>

<script>
export default {
  name: 'FsTableDraftOptions',
  props: {
    draft: {
      type: Object,
      required: true
    }
  }
}
</script>
