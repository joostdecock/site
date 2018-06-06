<template>
  <div>
  <table class="table fs-info-table">
    <thead>
      <tr>
        <th colspan="2" class="fs-titlerow">{{draft.model.name}}</th>
      </tr>
    <tr>
      <td colspan="2" class="text-xs-center py-3">
        <v-avatar size="128">
          <img :src="$fs.dataPath(draft.model.pictureSrc)" />
        </v-avatar>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th class="fs-wp50">{{ $t('reference') }}</th>
      <td><pre>{{ draft.model.handle }}</pre></td>
    </tr>
    <tr>
      <th>{{ $t('breasts') }}</th>
      <td>{{ (draft.model.breasts === 0) ? $t('no') : $t('yes')  }}</td>
    </tr>
    <tr>
      <th>{{ $t('units') }}</th>
      <td>{{ $t(draft.model.units) }}</td>
    </tr>
    </tbody>
    <thead>
    <tr>
      <th colspan="2" class="fs-titlerow">{{ $t('measurements') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(val, key) in draft.data.measurements" :key="key">
      <th>{{ $t(key) }}</th>
      <td v-html="$fs.formatUnits(val, draft.model.units, 'measure')"></td>
    </tr>
    </tbody>
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
