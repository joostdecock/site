<template>
  <section>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t($route.params.locale) }}</fs-breadcrumbs>
    <h1>{{ $t($route.params.locale) }}</h1>
    <div class="fs-content elevation-1">
      <v-tabs v-model="active" color="primary" dark centered icons-and-text>
        <v-tab href="#messages">{{ $t('messages') }}<v-icon style="text-transform: none">chat_bubblee</v-icon></v-tab>
        <v-tab href="#content">{{ $t('content') }}<v-icon style="text-transform: none">import_contacts</v-icon></v-tab>
        <v-tab href="#emails">{{ $t('emails') }}<v-icon style="text-transform: none">mail</v-icon></v-tab>
        <v-tab-item id="messages" class="fs-pad">
          <div class="text-xs-center mb-4">
            <h3>{{ $t('messages') }}</h3>
          </div>
          <v-tabs v-model="active_file" color="transparent" centered>
            <v-tab v-for="file in $fs.conf.i18n.files" :href="'#'+file" :key="file">{{ file }}.yaml</v-tab>
            <v-tab-item v-for="file in $fs.conf.i18n.files" :id="file" class="fs-pad" :key="file">
              <fs-i18n-yaml :locale="$route.params.locale" :file="file" />
            </v-tab-item>
          </v-tabs>
        </v-tab-item>
        <v-tab-item id="patterns" class="fs-pad">
          <s-header-status-i18n :stats="stats" section="patterns" />
          <h3>{{ $t('patterns') }}</h3>
          <ul>
            <li><b class="mr-2">{{ $t('description') }}:</b> {{ $t('strings-patterns') }}.</li>
            <li><b class="mr-2">{{ $t('format') }}:</b>
              <a :href="'https://github.com/freesewing/site/tree/v2/nuxt/assets/i18n/'+$route.params.locale+'/patterns.yaml'">
                {{ $t('string-format-yaml') }}
              </a>.
            </li>
          </ul>
        </v-tab-item>
        <v-tab-item id="options" class="fs-pad">
          <h3>{{ $t('patternOptions') }}</h3>
          <ul>
            <li><b class="mr-2">{{ $t('description') }}:</b> {{ $t('strings-options') }}.</li>
            <li><b class="mr-2">{{ $t('format') }}:</b>
              <a :href="'https://github.com/freesewing/site/tree/v2/nuxt/assets/i18n/'+$route.params.locale+'/options.yaml'">
                {{ $t('string-format-yaml') }}
              </a>.
            </li>
          </ul>
        </v-tab-item>
        <v-tab-item id="content" class="fs-pad">
          <h3>{{ $t('content') }}</h3>
          <ul>
            <li><b class="mr-2">{{ $t('description') }}:</b> {{ $t('strings-content') }}.</li>
            <li><b class="mr-2">{{ $t('format') }}:</b>
              <a :href="'https://github.com/freesewing/site/tree/v2/nuxt/content/'+$route.params.locale">
                {{ $t('string-format-md') }}
              </a>.
            </li>
          </ul>
        </v-tab-item>
        <v-tab-item id="emails" class="fs-pad">
          <h3>{{ $t('emails') }}</h3>
          <ul>
            <li><b class="mr-2">{{ $t('description') }}:</b> {{ $t('strings-emails') }}.</li>
            <li><b class="mr-2">{{ $t('format') }}:</b>
              <a href="fixme">
                {{ $t('string-format-yaml') }}
              </a>.
            </li>
          </ul>
        </v-tab-item>
      </v-tabs>
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
    </div>
  </section>
</template>

<script>

import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsI18nYaml from '~/components/stateless/FsI18nYaml'
import FsHeaderStatusI18n from '~/components/stateless/FsHeaderStatusI18n'

export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs,
    FsI18nYaml,
    FsHeaderStatusI18n
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
        active: 'messages',
        active_file: 'app'
      }
  },
  methods: {
    icon(type) {
      if(type === 'blog') return 'rss_feed'
      else if(type === 'docs') return 'import_contacts'
      else if(type === 'showcase') return 'photo_camera'
      else return 'translate'
    }
  }
}
</script>
