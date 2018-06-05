<template>
  <section>
    <div v-for="(group, g) in $fs.conf.patterns[pattern].optiongroups" :key="g">
      <h2>{{ $t(g) }}</h2>
    <div v-for="o in $fs.conf.patterns[pattern].optiongroups[g]" :key="o">
      <h3>{{ $fs.pot(o, pattern, $i18n.locale) }}<a :href="'#'+o.toLowerCase()" :id="o.toLowerCase()" class="nuxtdown-toc" aria-hidden="true">🔗</a></h3>
      <fs-docs-pattern-option-image :pattern="pattern" :option="o" v-if="content[o]" />
      <div v-html="content[o].body" v-if="content[o]"></div>
    </div>
    </div>
  </section>
</template>

<script>
import FsDocsPatternOptionImage from '~/components/stateless/FsDocsPatternOptionImage'

export default {
  name: 'FsDocsPatternOptions',
  components: {
    FsDocsPatternOptionImage
  },
  props: {
    pattern: {
      type: String,
      required: false
    }
  },
  data: function() {
    let measurements = []
    for (let i in this.$fs.conf.measurements.all) {
      measurements.push(i)
    }
    return {
      measurements,
      content: []
    }
  },
  mounted: async function () {
    const content = {}
    let options = []
    const toc = {
      topLevel: 2,
      items: {}
    }
    for (let g in this.$fs.conf.patterns[this.pattern].optiongroups) {
      toc.items[g.toLowerCase()] = {
        level: 2,
        title: this.$t(g),
        link: '#'+g.toLowerCase()
      }
      for (let i in this.$fs.conf.patterns[this.pattern].optiongroups[g]) {
        let o = this.$fs.conf.patterns[this.pattern].optiongroups[g][i]
        options.push(o)
        toc.items[o.toLowerCase()] = {
          level: 3,
          title: this.$fs.pot(o, this.pattern, this.$i18n.locale),
          link: '#'+o.toLowerCase()
        }
        let loc = this.$fs.pathLocale(this.$route.path)
        let locPath = (loc === 'en') ? '' : '/'+loc
        let path = locPath+'/docs/patterns/'+this.pattern+'/options/'+o.toLowerCase()
        content[o] = await this.$fs.content('/'+this.$i18n.locale+'/docs').get(path)
        .then(function (data) {
          return data
        })
        .catch(function (res) {
          console.log('Content not found')
        })
        if((typeof content[o] === 'undefined' || typeof content[o].page === 'undefined') && this.$i18n.locale !== 'en') {
          console.log('Trying English version')
          content[o] = await this.$fs.content('/en/docs').get(path.substr(3))
          .then(function (data) {
            return data
          })
        }
      }
    }
    this.options = options.sort()
    this.content = content
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
