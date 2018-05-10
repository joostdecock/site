<template>
  <div>
    <div class="text-xs-center mt-3 mb-3">
      <v-progress-circular size="100" :value="score" :rotate="(-90)" :width="(12)" :color="$fs.percentColor(score)">{{score}}%</v-progress-circular>
    </div>

  <v-data-table
    :headers="headers"
    :items="items"
    :pagination.sync="pagination"
    must-sort
    class="elevation-1"
    v-model="selected"
    :rows-per-page-items="[10,25,50,{text: $t('all'),value:-1}]"
    :rows-per-page-text="$t('rowsPerPage')"
  >
    <template slot="items" slot-scope="props">
      <td>
          {{ props.item.key }}
      </td>
      <td>
          {{ $t(props.item.key, 'en') }}
      </td>
      <td>
        <span v-if="file !== 'patterns' && file !== 'options'">
          {{ translate(props.item.key) }}
        </span>
      </td>
      <td>
        <v-icon color="error" v-if="props.item.missing">error_outline</v-icon>
        <v-icon v-else color="success">check_circle</v-icon>
      </td>
    </template>
    <template slot="pageText" slot-scope="props">
      {{ $t('rowsFromToOfTotal', {from: props.pageStart, to: props.pageStop, total: props.itemsLength}) }}
    </template>
    <template slot="no-data">
    <blockquote class="mt-5 mb-5 text-xs-center">
        <h3>{{ $t('justAMoment') }}</h3>
        <p>{{ $t('weAreLoadingDataFromTheBackend') }}</p>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </blockquote>
    </template>
  </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'FsI18nYaml',
  components: {
  },
  props: {
    locale: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      headers: [
        { text: ' '+this.$t('key'), value: 'key' },
        { text: ' '+this.$t('en'), value: 'en' },
        { text: ' '+this.$t(this.locale), value: this.locale },
        { text: ' '+this.$t('status'), value: 'missing' }
      ],
      selected: [],
      pagination: {
        sortBy: 'translated',
        descending: true
      },
      items: [],
      lang: {},
      score: 0,
      count: 0,
      missing: 0,
    }
  },
  methods: {
    translate(key) {
      let val = this.lang[key]
      return this.lang[key].replace('TODO', '').replace('DONE', '').trim()
    }
  },
  mounted: async function() {
    const self = this
    const items = []
    let misscount = 0
    this.$fs.get('/i18n/'+this.locale+'.'+this.file+'.json')
    .then(function (data) {
      for(let i in data) {
        let isMissing = (data[i].indexOf('TODO') === -1) ? false: true
        let item = {
          key: i,
          val: data[i],
          missing: isMissing
        }
        items.push(item)
        if(isMissing) misscount++
      }
      self.items = items
      self.lang = data
      self.score = 100 - misscount/(items.length/100)
      self.missing = misscount
      self.count = items.length
    })
    .catch(function (res) {
      console.log(res)
      console.log('Failed to load list of missing strings')
    })
  }
}
</script>
