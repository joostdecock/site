<template>
  <section class="blogpost">
    <fs-breadcrumbs-blog :title="post.linktitle" />
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
import FsBreadcrumbsBlog from '~/components/stateless/FsBreadcrumbsBlog'
import FsMessageLocaleFallback from '~/components/stateless/FsMessageLocaleFallback'
// Dynamic
export default {
  components: {
    FsBreadcrumbsBlog,
    FsMessageLocaleFallback,
  },
  methods: {
    authorLink: function () {
      return '/blog/author/'+this.post.author.replace(/\s/g,''); 
    },
  },
  asyncData: async function ({ app, route, isDev }) {
    const data = {}
    data.post = await app.$content('/'+app.i18n.locale+'/blog').get(route.path)
    .then(function (data) {
      return data
    })
    .catch(function (res) {
      console.log('Content not found')
    })
    if(typeof data.post === 'undefined' && app.i18n.locale !== 'en') {
      console.log('Trying English version')
      data.post = await app.$content('/en/blog').get(route.path.substr(3))
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
      component: 'fs-dynamic-aside-blogpost'
    })
    if(this.post.updates > 0) {
      const updates = this.post.updates
    } else {
      const updates = 0
    }
    this.$store.commit('setComponentData', {
      source: 'blogpost',
      data: {
        author: this.post.author, 
        date: this.post.date, 
        category: this.post.category, 
        updates: this.post.updates, 
        toc: this.post.toc 
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
