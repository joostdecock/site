<template>
  <section>
    <div v-for="m in measurements" :key="m">
      <h2>{{ $t(m) }}<a class="nuxtdown-toc" :href="'#'+m.toLowerCase()" aria-hidden="true" :id="m.toLowerCase()">🔗</a></h2>
      <fs-docs-measurement-image
        v-if="content[m] && content[m].body"
        :measurement="m"
        :onlyforbreasts="(content[m].onlyForBreasts) ? true : false"
        :seated="(content[m].seated) ? true : false"
        />
      <div v-if="content[m] && content[m].body" v-html="content[m].body"></div>
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
    let measurements = []
    const toc = {
      topLevel: 2,
      items: {}
    }
    for (let m in this.$fs.conf.measurements.all) {
      measurements.push(m)
      toc.items[m.toLowerCase()] = {
        level: 2,
        title: this.$t(m),
        link: '#'+m.toLowerCase()
      }
      let loc = this.$fs.pathLocale(this.$route.path)
      let locPath = (loc === 'en') ? '' : '/'+loc
      let path = locPath+'/docs/measurements/'+m.toLowerCase()
      content[m] = await this.$fs.content('/'+this.$i18n.locale+'/docs').get(path)
      .then(function (data) {
        console.log(typeof data)
        return data
      })
      .catch(function (res) {
        console.log('Content not found')
      })
      if((typeof content[m] === 'undefined' || typeof content[m].page === 'undefined') && this.$i18n.locale !== 'en') {
        console.log('Trying English version')
        content[m] = await this.$fs.content('/en/docs').get(path.substr(3))
        .then(function (data) {
          return data
        })
      }
    }
    this.measurements = measurements.sort()
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
