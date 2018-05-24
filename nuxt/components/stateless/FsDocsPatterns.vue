<template>
  <section>
    <div v-for="pattern in Object.keys($fs.conf.patterns)" :key="pattern">
      <h2>{{ $fs.ucfirst(pattern) }}</h2>
      <ul>
        <li><nuxt-link :to="$fs.path('/docs/patterns/'+pattern)">{{ $t('patternInstructions') }}</nuxt-link></li>
        <li><nuxt-link :to="$fs.path('/docs/patterns/'+pattern+'/measurements')">{{ $t('requiredMeasurements') }}</nuxt-link></li>
        <li><nuxt-link :to="$fs.path('/docs/patterns/'+pattern+'/options')">{{ $t('patternOptions') }}</nuxt-link></li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FsDocsPatterns',
  mounted: async function () {
    const toc = {
      topLevel: 2,
      items: {}
    }
    for (let pattern in Object.keys(this.$fs.conf.patterns)) {
      toc.items[pattern] = {
        level: 2,
        title: this.$fs.ucfirst(pattern),
        link: '#'+pattern
      }
    }
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn',
      component: 'fs-dynamic-aside-page'
    })
    this.$store.commit('setComponentData', {
      source: 'page',
      data: {
        toc: toc,
        meta: {}
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
