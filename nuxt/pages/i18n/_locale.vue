<template>
  <section>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t($route.params.locale) }}</fs-breadcrumbs>
    <div class="fs-content fs-pad elevation-1">
    <h1>{{ $t('i18n') }}</h1>
    <pre>
    {{ status }}
    </pre>
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
      let loc = this.$route.params.locale
        status.coordinator = this.$fs.conf.i18n.status.locales[loc].coordinator
        const scores = this.$fs.conf.i18n.status.locales[loc]
        for(let t in types) {
          status[t] = {}
          let percent = Math.round(scores[t]/(this.$fs.conf.i18n.status.target[t]/100))
          status[t].score = percent
          if(percent>90) status[t].color = "success"
          else if(percent>50) status[t].color = "accent"
          else status[t].color = "primary"
        }
      return {
        status: status,
        crumbs: [
          {
            to: this.$fs.path('/i18n/'),
            title: this.$t('i18n')
          }
        ]
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
