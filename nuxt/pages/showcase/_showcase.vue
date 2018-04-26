<template>
  <section class="blogpost">
    <fs-breadcrumbs-showcase :title="post.title" />
    <fs-message-locale-fallback v-if="$i18n.locale != post.contentLocale" />
    <figure>
      <a href='#'>
        <img 
         :src="imgDir+'/high_'+post.img" 
         class="elevation-9" 
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
    <h1>{{ post.title }} </h1>
    <nuxtdown-body :body="post.body" class="fs-content fs-text" />
  </section>
</template>

<script>
import FsBreadcrumbsShowcase from '~/components/stateless/FsBreadcrumbsShowcase'
import FsMessageLocaleFallback from '~/components/stateless/FsMessageLocaleFallback'

export default {
  components: {
    FsBreadcrumbsShowcase,
    FsMessageLocaleFallback,
  },
  methods: {
    authorLink: function () {
      return '/blog/author/'+this.post.author.replace(/\s/g,''); 
    },
  },
  asyncData: async function ({ app, route }) {
    const data = {}
    data.post = await app.$content('/'+app.i18n.locale+'/showcase').get(route.path)
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
      component: 'fs-right-column-showcase'
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
        category: this.post.category, 
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
