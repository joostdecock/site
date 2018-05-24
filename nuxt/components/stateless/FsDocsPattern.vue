<template>
  <section>
    <blockquote class="tip">
      <h4>{{ $t('seeAlso') }}</h4>
      <ul>
        <li><nuxt-link :to="$fs.path('/docs/patterns/'+page.pattern+'/measurements')">{{ $t('requiredMeasurements') }}</nuxt-link></li>
        <li><nuxt-link :to="$fs.path('/docs/patterns/'+page.pattern+'/options')">{{ $t('patternOptions') }}</nuxt-link></li>
      </ul>
    </blockquote>
    <figure>
      <img :src="'/img/patterns/'+page.pattern+'/'+page.pattern+'.svg'" class="elevation-1"/>
      <figcaption>{{ $t('patternLineDrawing', {pattern: $fs.ucfirst(page.pattern)}) }}</figcaption>
    </figure>
  </section>
</template>

<script>
export default {
  name: 'FsDocsPatterns',
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  //mounted: async function () {
  //  const toc = {
  //    topLevel: 2,
  //    items: {}
  //  }
  //  for (let pattern in Object.keys(this.$fs.conf.patterns)) {
  //    toc.items[pattern] = {
  //      level: 2,
  //      title: this.$fs.ucfirst(pattern),
  //      link: '#'+pattern
  //    }
  //  }
  //  this.$store.commit('setDynamicComponent', {
  //    region: 'rightColumn',
  //    component: 'fs-dynamic-aside-page'
  //  })
  //  this.$store.commit('setComponentData', {
  //    source: 'page',
  //    data: {
  //      toc: toc,
  //      meta: {}
  //    }
  //  })
  //},
  //beforeDestroy: function() {
  //  this.$store.commit('setDynamicComponent', {
  //    region: 'rightColumn',
  //    component: ''
  //  })
  //}
}
</script>
