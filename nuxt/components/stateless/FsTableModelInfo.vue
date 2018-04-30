<template>
  <div>
  <table class="table fs-info-table">
    <tr>
      <td colspan="2" class="text-xs-center py-3">
        <v-avatar size="256">
          <img :src="$fs.dataPath(draft.model.pictureSrc)" />
        </v-avatar>
      </td>
    </tr>
    <tr>
      <th>{{ $t('name') }}</th>
      <td>{{ draft.model.name }}</td>
    </tr>
    <tr>
      <th>{{ $t('breasts') }}</th>
      <td>{{ (draft.model.body === 'male') ? $t('no') : $t('yes')  }}</td>
    </tr>
    <tr>
      <th>{{ $t('units') }}</th>
      <td>{{ $t(draft.model.units) }}</td>
    </tr>
    <tr>
      <th colspan="2" class="text-xs-center py-2">{{ $t('measurements') }}</th>
    </tr>
    <tr v-for="(val, key) in draft.data.measurements" :key="key">
      <th>{{ $t(key) }}</th>
      <td>{{ $fs.formatUnits(val, $store.state.user.units, 'measure') }}</td>
    </tr>
  </table>
  </div>
</template>

<script>
export default {
  name: 'FsTableModelInfo',
  props: {
    draft: {
      type: Object,
      required: true
    }
  }
}
</script>
