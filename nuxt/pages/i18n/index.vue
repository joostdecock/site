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
          <th v-html="$t('coordinator')" class="text-xs-left fs-wp20"></th>
          <th v-html="$t('details')" class="text-xs-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(s, loc) in stats" :key="'tr-'+loc">
          <td :key="'col1-'+loc" v-html="$t(loc)" class="text-xs-right"></td>
          <td :key="'col2-'+loc">
            <v-progress-linear height="4" :value="s.avg.score" :key="'bar-'+index+t" :color="s.avg.color"></v-progress-linear>
          </td>
          <td :key="'col3-'+loc" class="text-xs-center">
            <v-btn v-if="$fs.conf.i18n.coordinators[loc] === '_vacant'" block color="accent"
              :href="'mailto:joost@decock.org?Subject=I%20could%20be%20language%20coordinator%20for%20'+loc">
              <v-icon class="mr-3">translate</v-icon>
              {{ $t('volunteerVerb') }}
            </v-btn>
            <nuxt-link :to="$fs.userPath(stats[loc].coordinator)" v-else>@{{ $fs.conf.i18n.coordinators[loc]}}</nuxt-link>
          </td>
          <td :key="'col4-'+loc" class="text-xs-center">
            <v-btn :to="$fs.path('/i18n/'+loc)" block color="primary">
              <v-icon class="mr-3">insert_drive_file</v-icon>
              {{ $t('languageLanguageFiles', {language: $t(loc)} ) }}
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
          stats[loc].avg = {
            score: avg,
            color: this.$fs.percentColor(avg)
          }
        }
      }
      return {
        stats: stats,
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
