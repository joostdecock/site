<template>
  <section class="blogpost">
    <fs-breadcrumbs :crumbs="crumbs">{{post.title}}</fs-breadcrumbs>
    <fs-message-locale-fallback v-if="$i18n.locale != post.contentLocale" />
    <article class="fs-content elevation-1">
    <figure>
      <a href='#'>
        <img
         :src="imgDir+'/high_'+post.img"
         data-sizes="auto"
         data-srcset="
         lqip_1.jpg 25w,
         low_1.jpg 500w,
         med_1.jpg 1000w,
         high_1.jpg 2000w"
         >
      </a>
      <figcaption v-html="post.caption"></figcaption>
    </figure>
      <div class="fs-xpad">
    <h1>{{ post.title }} </h1>
    <nuxtdown-body :body="post.body" class="fs-content fs-text pb-3" />
      </div>
    </article>
  </section>
</template>

<script>
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsMessageLocaleFallback from '~/components/stateless/FsMessageLocaleFallback'

export default {
  components: {
    FsBreadcrumbs,
    FsMessageLocaleFallback,
  },
  data: function() {
    return {
      crumbs: [
        {
          to: this.$fs.path('/showcase/'),
          title: this.$t('showcase')
        }
      ]
    }
  },
  methods: {
    categories: function(cats) {
      if(typeof cats === 'string') return [cats]
      else return cats
    }
  },
  asyncData: async function ({ app, route }) {
    const data = {}
    let path = route.path
    // Strip trailing slash
    if(path.substr(-1) === '/') path = path.substr(0, path.length-1)
    data.post = await app.$content('/'+app.i18n.locale+'/showcase').get(path)
    .then(function (data) {
      return data
    })
    .catch(function (res) {
      console.log('Content not found')
    })
    if(typeof data.post === 'undefined' && app.i18n.locale !== 'en') {
      console.log('Trying English version')
      data.post = await app.$content('/en/showcase').get(route.path.substr(3))
      .then(function (data) {
        return data
      })
    }
    return data
  },
  computed: {
    imgDir () {
      if (this.$i18n.locale === this.$i18n.fallbackLocale || this.post.contentLocale != this.$i18n.locale) {
        return '/img'+this.post.permalink
      } else {
        return '/img'+this.post.permalink.substr(3)
      }
    }
  },
  mounted: function() {
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn',
      component: 'fs-dynamic-aside-showcase'
    })
    if(this.post.updates > 0) {
      const updates = this.post.updates
    } else {
      const updates = 0
    }
    this.$store.commit('setComponentData', {
      source: 'showcase',
      data: {
        author: this.post.author,
        date: this.post.date,
        category: this.categories(this.post.category),
        updates: this.post.updates
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
