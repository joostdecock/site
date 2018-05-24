<template>
  <section>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t($route.params.locale) }}</fs-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('statusTranslationLanguage', {language: $t($route.params.locale)}) }}</h1>
    <div class="fs-content elevation-1 mt-5">
      <v-tabs v-model="active" color="primary" dark centered icons-and-text>
        <v-tab key="0">{{ $t('messages') }}<v-icon style="text-transform: none">chat_bubble</v-icon></v-tab>
        <v-tab key="1">{{ $t('content') }}<v-icon style="text-transform: none">import_contacts</v-icon></v-tab>
        <v-tab key="2">{{ $t('emails') }}<v-icon style="text-transform: none">mail</v-icon></v-tab>
        <v-tab-item key="0" class="fs-pad">
          <div class="text-xs-center mb-4">
            <h3>{{ $t('messages') }}</h3>
          </div>
          <v-tabs v-model="nestedActive[0]" color="transparent" centered>
            <v-tab v-for="file in $fs.conf.i18n.files" :key="file">{{ file }}.yaml</v-tab>
            <v-tab-item v-for="file in $fs.conf.i18n.files" class="fs-pad" :key="file">
              <fs-i18n-yaml :locale="$route.params.locale" :file="file" />
            </v-tab-item>
          </v-tabs>
        </v-tab-item>
        <v-tab-item key="1" class="fs-pad">
          <div class="text-xs-center mb-4">
            <h3>{{ $t('content') }}</h3>
          </div>
          <fs-i18n-content :locale="$route.params.locale" :content="content" />
        </v-tab-item>
        <v-tab-item key="2" class="fs-pad">
          <fs-i18n-email :locale="$route.params.locale" :email="email" :score="emailScore" />
        </v-tab-item>
      </v-tabs>
    </div>
    <div class="fs-pad">
      <blockquote class="fs-m800 mt-5 mb-5 i18n">
        <h3>{{ $t('joinTheTranslationTeam') }}</h3>
        <p>{{ $t('txt-joinTheTranslationTeam1')}}</p>
        <p>{{ $t('txt-joinTheTranslationTeam2')}}</p>
        <p>{{ $t('txt-joinTheTranslationTeam3')}}</p>
        <p class="text-xs-right mt-5"><v-btn :to="$fs.path('/docs/i18n/')" color="primary">
          <v-icon class="mr-3">translate</v-icon>
          {{ $t('documentationForTranslators')}}</v-btn>
        </p>
      </blockquote>
    </div>
  </section>
</template>

<script>

import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsI18nYaml from '~/components/stateless/FsI18nYaml'
import FsI18nContent from '~/components/stateless/FsI18nContent'
import FsI18nEmail from '~/components/stateless/FsI18nEmail'

export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs,
    FsI18nYaml,
    FsI18nContent,
    FsI18nEmail,
  },
  data() {
      let avg = 0
      const stats = {}
      const types = this.$fs.conf.i18n.target
      let loc = this.$route.params.locale
      if(loc !== this.$fs.conf.i18n.template) {
        avg = 0
        const scores = this.$fs.conf.i18n.stats[loc]
        for(let t in types) {
          stats[t] = {}
          let percent = Math.round(scores[t]/(this.$fs.conf.i18n.target[t]/100))
          avg += percent
          stats[t].score = percent
          stats[t].color = this.$fs.percentColor(percent)
        }
        avg = avg/Object.keys(types).length,
        stats.avg = {
          score: avg,
          color: this.$fs.percentColor(avg)
        }
      }
      return {
        stats: stats,
        crumbs: [
          {
            to: this.$fs.path('/i18n/'),
            title: this.$t('i18n')
          }
        ],
        active: "0",
        nestedActive: ["0", "0", "0"]
      }
  },
  methods: {
    icon(type) {
      if(type === 'blog') return 'rss_feed'
      else if(type === 'docs') return 'import_contacts'
      else if(type === 'showcase') return 'photo_camera'
      else return 'translate'
    }
  },
  asyncData: async function ({ app, route }) {
    const content = {
      items: [],
      missing: {},
      target: {},
      score: {}
    }
    const db = {}
    for(let t in app.$fs.conf.content) {
      let type = app.$fs.conf.content[t]
      db[type] = {orig: {}, tran: {}}
      content.missing[type] = 0
      content.target[type] = 0
      var orig =  await app.$content('/en/'+type).getAll();
      for(let i in orig) {
        db[type].orig[orig[i].permalink] = orig[i]
      }
      try {
        var tran =  await app.$content('/'+route.params.locale+'/'+type).getAll();
      }
      catch(error) {
        console.log('No '+type+' content for '+route.params.locale)
        var tran = {}
      }
      for(let i in tran) {
        db[type].tran[tran[i].permalink] = tran[i]
      }
      for(let i in db[type].orig) {
        const permalink = (route.params.locale !== 'en') ? '/'+route.params.locale+i : i
        if(typeof db[type].tran[permalink] !== 'undefined') {
          content.items.push({type: type, item: {
            permalink: db[type].tran[permalink].permalink,
            title: db[type].tran[permalink].title,
            path: db[type].tran[permalink].path,
            meta: db[type].tran[permalink].meta,
          }, translated: true})
        } else {
          content.items.push({type: type, item: {
            permalink: db[type].orig[i].permalink,
            title: db[type].orig[i].title,
            path: db[type].orig[i].path,
            meta: db[type].orig[i].meta,
          }, translated: false})
          content.missing[type]++
        }
        content.target[type]++
      }
      content.score[type] = Math.round(100 - content.missing[type]/(content.target[type]/100))
    }
    const email = {}
    const emailItems = []
    let emailCount = 0
    let emailMissingCount = 0
    await app.$fs.get('/i18n/'+route.params.locale+'.email.json')
    .then((data) => { email[route.params.locale] = data })
    .catch((error) => { console.log(error) })
    await app.$fs.get('/i18n/en.email.json')
    .then((data) => { email.en = data })
    .catch((error) => { console.log(error) })
    for(let i in email.en) {
      let missing = (email[route.params.locale][i].indexOf('TODO') === -1) ? false : true
      emailCount++
      if(missing) emailMissingCount++
      emailItems.push({
        key: i,
        val: email[route.params.locale][i],
        en: email.en[i],
        missing: missing
      })
    }
    let emailScore = 100 - Math.round(emailMissingCount/(emailCount/100))
    return { content: content, email: emailItems, emailScore: emailScore }
  },
}
</script>
