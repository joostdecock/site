<template>
  <section>
    <fs-breadcrumbs>{{ $t('i18n') }}</fs-breadcrumbs>
    <div class="fs-content fs-pad elevation-1">
    <h1>{{ $t('i18n') }}</h1>
    <p>Below is the current status of our translaton efforts.</p>
    <p>For more info, read the documentation: <nuxt-link :to="$fs.path('/docs/i18n')">Documentation for translators</nuxt-link>.</p>
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
        <tr v-for="(s, loc) in status" :key="'tr-'+loc">
          <td :key="'col1-'+loc" v-html="$t(loc)" class="text-xs-right"></td>
          <td :key="'col2-'+loc">
            <v-layout row v-for="t in ['strings', 'blog', 'showcase', 'docs']" :key="'lay'+loc+t">
              <div style="width:30px; display: inline-block" :key="'flex1'+loc+t">
                <v-icon style="display: inline-block" :key="'icon'+loc+t" :color="s[t].color">{{icon(t)}}</v-icon>
              </div>
              <div style="display: inline-block; width: 100%; padding-left: 6px; " :key="'flex11'+loc+t">
                <v-progress-linear height="4" :value="s[t].score" :key="'bar-'+index+t" :color="s[t].color"></v-progress-linear>
              </div>
            </v-layout>
          </td>
          <td :key="'col3-'+loc">
            <v-btn v-if="status[loc].coordinator === '_vacant'" flat outline
              :href="'mailto:joost@decock.org?Subject=I%20could%20be%20language%20coordinator%20for%20'+loc">Volunteer</v-btn>
            <nuxt-link :to="$fs.userPath(status[loc].coordinator)" v-else>@{{status[loc].coordinator}}</nuxt-link>
          </td>
          <td :key="'col4-'+loc" class="text-xs-center">
            <nuxt-link :to="$fs.path('/i18n/'+loc)">{{ $t('languageLanguageFiles', {language: $t(loc)} ) }}</nuxt-link>
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
      const status = {}
      const types = this.$fs.conf.i18n.status.target
      for(let loc in this.$fs.conf.i18n.status.locales) {
        status[loc] = {}
        status[loc].coordinator = this.$fs.conf.i18n.status.locales[loc].coordinator
        const scores = this.$fs.conf.i18n.status.locales[loc]
        for(let t in types) {
          status[loc][t] = {}
          let percent = Math.round(scores[t]/(this.$fs.conf.i18n.status.target[t]/100))
          status[loc][t].score = percent
          if(percent>90) status[loc][t].color = "success"
          else if(percent>50) status[loc][t].color = "accent"
          else status[loc][t].color = "primary"
        }
      }
      return {
        status: status,
        locales: Object.keys(status)
      }
  },
  methods: {
    localeCoordinator: function(locale) {
      if(this.status[locale].coordinator === '_vacant') {
        return 'fixme'
      } else {
        return this.$fs.conf.i18n.status.locales[locale].coordinator
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
