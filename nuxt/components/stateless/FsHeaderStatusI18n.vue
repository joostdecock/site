<template>
  <div>
    <div class="text-xs-center mb-4">
      <h3>{{ $t(section) }}</h3>
      <v-progress-circular size="100" :value="stats[section].score" rotate="-90" width="12" :color="stats[section].color">{{ stats[section].score}}%</v-progress-circular>
    </div>
    <div class="fs-m600">
      <table>
        <tr>
          <td style="text-align: right; font-weight: bold; padding-right: 12px;">{{ $t('description') }}</td>
          <td>
            {{ $t('strings-'+section) }}
          </td>
        </tr>
        <tr>
          <td style="text-align: right; font-weight: bold; padding-right: 12px;">{{ $t('format') }}</td>
          <td>
            <a :href="'https://github.com/freesewing/site/tree/v2/nuxt/assets/i18n/'+locale+'/site.yaml'">
              {{ $t('string-format-yaml') }}
            </a>
          </td>
        </tr>
        <tr>
          <td style="text-align: right; font-weight: bold; padding-right: 12px;">{{ $t('stats') }}</td>
          <td>
            {{ $t('countAvailable' ,{count: stats[section].target}) }},
            {{ $t('countTranslated' ,{count: stats[section].count}) }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FsHeaderStatusI18n',
  props: {
    section: {
      type: String,
      required: true
    },
    locale: {
      type: String,
      required: true
    },
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>
