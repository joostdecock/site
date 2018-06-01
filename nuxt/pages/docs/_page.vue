<template>
  <section class="page">
    <fs-breadcrumbs-page :breadcrumbs="page.breadcrumbs" :title="page.title" />
    <fs-message-locale-fallback v-if="$i18n.locale != page.contentLocale" />
    <article class="fs-content elevation-1 fs-pad fs-docs">
      <h1>{{ page.title }} </h1>
      <fs-docs-measurement-image
        v-if="page.measurement"
        :measurement="page.measurement"
        :onlyforbreasts="(page.onlyForBreasts) ? true : false"
        :seated="(page.seated) ? true : false"
      />
      <fs-docs-measurements v-if="page.measurementsIndex" />
      <fs-docs-patterns v-if="page.patternsIndex" />
      <fs-docs-pattern v-if="page.patternIndex" :page="page"/>
      <fs-docs-measurements v-if="page.requiredMeasurements" :pattern="page.pattern" />
      <fs-docs-pattern-option-image v-if="page.pattern && page.option" :pattern="page.pattern" :option="page.option" />
      <fs-docs-pattern-options v-if="page.patternOptionsIndex" :pattern="page.pattern" />
      <nuxtdown-body :body="page.body" class="fs-content fs-text" />
    </article>
  </section>
</template>

<script>
import FsBreadcrumbsPage from '~/components/stateless/FsBreadcrumbsPage'
import FsMessageLocaleFallback from '~/components/stateless/FsMessageLocaleFallback'
import FsDocsMeasurementImage from '~/components/stateless/FsDocsMeasurementImage'
import FsDocsMeasurements from '~/components/stateless/FsDocsMeasurements'
import FsDocsPatterns from '~/components/stateless/FsDocsPatterns'
import FsDocsPattern from '~/components/stateless/FsDocsPattern'
import FsDocsPatternOptions from '~/components/stateless/FsDocsPatternOptions'
import FsDocsPatternOptionImage from '~/components/stateless/FsDocsPatternOptionImage'

export default {
  components: {
    FsBreadcrumbsPage,
    FsMessageLocaleFallback,
    FsDocsMeasurementImage,
    FsDocsMeasurements,
    FsDocsPatterns,
    FsDocsPattern,
    FsDocsPatternOptions,
    FsDocsPatternOptionImage,
  },
  asyncData: async function ({ app, route }) {
    const data = {}
    let loc = app.$fs.pathLocale(route.path)
    let path = route.path
    if(loc === 'en') {
      if(path.substr(0,6) !== '/docs/') {
        path = '/docs'+path
      }
    } else {
      if(path.substr(3,6) !== '/docs/') {
        path = '/'+loc+'/docs'+path.substr(3)
      }
    }
    // Strip trailing slash
    if(path.substr(-1) === '/') path = path.substr(0, path.length-1)
    data.page = await app.$content('/'+app.i18n.locale+'/docs').get(path)
    .then(function (data) {
      return data
    })
    .catch(function (res) {
      console.log('Content not found')
    })
    if(typeof data.page === 'undefined' && app.i18n.locale !== 'en') {
      console.log('Trying English version')
      data.page = await app.$content('/en/docs').get(route.path.substr(3))
      .then(function (data) {
        return data
      })
    }
    return data
  },
  mounted: function() {
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn',
      component: 'fs-dynamic-aside-page'
    })
    this.$store.commit('setComponentData', {
      source: 'page',
      data: {
        toc: this.page.toc,
        meta: this.page.meta
      }
    })
  },
  beforeDestroy: function() {
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn',
      component: ''
    })
  }
}
</script>
