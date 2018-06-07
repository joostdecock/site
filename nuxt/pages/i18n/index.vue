<template>
  <section>
    <fs-breadcrumbs>{{ $t('i18n') }}</fs-breadcrumbs>
    <h1 class="text-xs-center mb-5">{{ $t('i18n') }}</h1>
    <div class="fs-content fs-pad elevation-1">
    <table class="table fs-info-table">
      <thead>
        <tr class="fs-titlerow">
          <th v-html="$t('language')" class="text-xs-right fs-wp20"></th>
          <th v-html="$t('status')" class="text-xs-center fs-wp30"></th>
          <th v-html="$t('translators')" class="text-xs-center fs-wp30"></th>
          <th v-html="$t('details')" class="text-xs-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(loc) in sort" :key="'tr-'+loc">
          <td :key="'col1-'+loc" v-html="$t('locales.'+loc)" class="text-xs-right"></td>
          <td :key="'col2-'+loc">
            <v-progress-linear height="4" :value="stats[loc].avg.score" :key="'bar-'+loc" :color="stats[loc].avg.color"></v-progress-linear>
          </td>
          <td :key="'col3-'+loc" class="text-xs-center">
            <div v-if="$fs.conf.i18n.translators[loc] === '_vacant'">
              <v-btn :href="'mailto:joost@decock.org?Subject=I%20could%20help%20translate%20'+loc" fat small color="success">{{ $t('volunteerVerb') }}</v-btn>
            </div>
            <div v-else>
              <nuxt-link
                v-for="translator in $fs.conf.i18n.translators[loc]"
                :key="translator"
                :to="$fs.userPath(translator)"
                class="mr-3"
              >
                @{{ translator}}
              </nuxt-link>
            </div>
          </td>
          <td :key="'col4-'+loc" class="text-xs-center">
            <v-btn fab small :color="stats[loc].avg.color" :to="$fs.path('/i18n/'+loc)" class="fs-nodeco">
              <v-icon>folder_open</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </section>
</template>

<script>

import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'

export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs
  },
  data() {
      let avg = 0
      const stats = {}
      const sort = []
      const types = this.$fs.conf.i18n.target
      for(let loc in this.$fs.conf.i18n.stats) {
        if(loc !== this.$fs.conf.i18n.template) {
          avg = 0
          stats[loc] = {}
          const scores = this.$fs.conf.i18n.stats[loc]
          for(let t in types) {
            stats[loc][t] = {}
            let percent = Math.round(scores[t]/(this.$fs.conf.i18n.target[t]/100))
            avg += percent
            stats[loc][t].score = percent
            stats[loc][t].color = this.$fs.percentColor(percent)
          }
          avg = avg/Object.keys(types).length,
          sort.push([loc, avg])
          stats[loc].avg = {
            score: avg,
            color: this.$fs.percentColor(avg)
          }
        }
      }
      sort.sort(function(a,b) {
        return a[1] - b[1]
      })
      let sorted = []
      for(let s in sort.reverse()) {
        let entry = sort[s]
        sorted.push(entry[0])
      }
      return {
        stats: stats,
        sort: sorted,
        locales: Object.keys(stats)
      }
  },
  methods: {
    localeCoordinator: function(locale) {
      if(this.stats[locale].coordinator === '_vacant') {
        return 'fixme'
      } else {
        return this.$fs.conf.i18n.stats.locales[locale].coordinator
      }
    },
    icon(type) {
      if(type === 'blog') return 'rss_feed'
      else if(type === 'docs') return 'import_contacts'
      else if(type === 'showcase') return 'photo_camera'
      else return 'translate'
    }
  }
}
</script>
