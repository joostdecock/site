<template>
  <section>
    <div v-for="(option, o) in $fs.conf.patterns[pattern].options" :key="o">
      <h2>{{ $fs.pot(o, pattern, $i18n.locale) }}<a :href="'#'+o.toLowerCase()" :id="o.toLowerCase()" class="nuxtdown-toc" aria-hidden="true">🔗</a></h2>
      <div v-html="content[o].body" v-if="content[o]"></div>
    </div>
  </section>
</template>

<script>
import FsDocsMeasurementImage from '~/components/stateless/FsDocsMeasurementImage'

export default {
  name: 'FsDocsMeasurements',
  components: {
    FsDocsMeasurementImage
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
    for (let o in this.$fs.conf.patterns[this.pattern].options) {
      options.push(o)
      toc.items[o.toLowerCase()] = {
        level: 2,
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
        content[m] = await this.$fs.content('/en/docs').get(path.substr(3))
        .then(function (data) {
          return data
        })
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
