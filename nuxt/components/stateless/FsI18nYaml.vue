<template>
  <div>
    <pre>
    </pre>
    <div class="text-xs-center mt-3 mb-3">
      <v-progress-circular size="100" :value="score" :rotate="(-90)" :width="(12)" :color="$fs.percentColor(score)">{{score}}%</v-progress-circular>
      <p class="mt-3">
        <v-btn color="primary" :href="'https://github.com/freesewing/site/edit/v2/nuxt/locales/'+locale+'/'+file+'.yaml'">
          <fs-icon-github color="#FFF" class="mr-3" />
          Edit {{ file+'.yaml' }} on GitHub
        </v-btn>
      </p>
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
          <span v-if="file !== 'patterns' && file !== 'options'">
            {{ $t(props.item.key, 'en') }}
          </span>
          <span v-else-if="file === 'options'">
            {{ $t('_options.'+props.item.key, 'en') }}
          </span>
          <span v-else-if="file === 'patterns'">
            {{ $t('_patterns.'+props.item.key, 'en') }}
          </span>
        </td>
        <td>
          <span v-if="file !== 'patterns'">
            {{ translate(props.item.key) }}
          </span>
          <span v-else-if="file === 'patterns'">
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
import FsIconGithub    from '~/components/stateless/FsIconGithub'
export default {
  name: 'FsI18nYaml',
  components: {
    FsIconGithub
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
      let val = ''
      if(typeof this.lang[key] === 'undefined') {
        key = key.split('.')
        if(key.length === 2) val = this.lang[key[0]][key[1]]
        if(key.length === 3) val = this.lang[key[0]][key[1]][key[2]]
        if(key.length === 4) val = this.lang[key[0]][key[1]][key[2]][key[3]]
      } else val = this.lang[key]
      return val.replace('TODO', '').replace('DONE', '').trim()
    },
    isMissing(val) {
      return (val.indexOf('TODO') === -1) ? false: true
    }
  },
  mounted: async function() {
    const self = this
    const items = []
    let misscount = 0
    this.$fs.get('/i18n/'+this.locale+'.'+this.file+'.json')
    .then(function (data) {
      if(self.file === 'options') {
        for(let i in data) {
          items.push({key: i+'.title', val: data[i].title, missing: self.isMissing(data[i].title)})
          if(self.isMissing(data[i].title)) misscount++
          if(typeof data[i].description === 'string') {
            items.push({key: i+'.description', val: data[i].description, missing: self.isMissing(data[i].description)})
            if(self.isMissing(data[i].description)) misscount++
          } else {
            for(let j in data[i].description) {
              items.push({key: i+'.description.'+j, val: data[i].description[j], missing: self.isMissing(data[i].description[j])})
              if(self.isMissing(data[i].description[j])) misscount++
            }
          }
          if(typeof data[i].options !== 'undefined') {
            for(let o in data[i].options) {
              if(typeof data[i].options[o] === 'string') {
                items.push({key: i+'.options.'+o, val: data[i].options[o], missing: self.isMissing(data[i].options[o])})
                if(self.isMissing(data[i].options[o])) misscount++
              } else {
                for(let oo in data[i].options[o]) {
                  items.push({key: i+'.options.'+o+'.'+oo, val: data[i].options[o][oo], missing: self.isMissing(data[i].options[o][oo])})
                  if(self.isMissing(data[i].options[o][oo])) misscount++
                }
              }
            }
          }
        }
      } else if(self.file === 'patterns') {
        for(let i in data) {
          items.push({key: i+'.title', val: data[i].title, missing: self.isMissing(data[i].title)})
          items.push({key: i+'.description', val: data[i].description, missing: self.isMissing(data[i].description)})
          if(self.isMissing(data[i].title)) misscount++
          if(self.isMissing(data[i].description)) misscount++
        }
      } else {
        for(let i in data) {
          items.push({key: i,val: data[i], missing: self.isMissing(data[i])})
          if(self.isMissing(data[i])) misscount++
        }
      }
      self.items = items
      self.lang = data
      self.score = 100 - Math.round(misscount/(items.length/100))
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
