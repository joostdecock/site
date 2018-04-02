<template>
  <section class="blogpost">
    <fs-breadcrumbs-blog :title="post.linktitle" />
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
import FsBreadcrumbsBlog from '~/components/Fs/Navigation/FsBreadcrumbsBlog'
import FsLink from '~/components/Fs/i18n/FsLink'
// Dynamic
import moment from 'moment'
export default {
  components: {
    FsBreadcrumbsBlog,
    FsLink
  },
  methods: {
    authorLink: function () {
      return '/blog/author/'+this.post.author.replace(/\s/g,''); 
    },
  },
  asyncData: async function ({ app, route }) {
    let locale = ''
    if(route.path.substr(0,5) === '/blog') {
      locale = 'en'
    }
    else {
      locale = route.path.substr(1).split('/').shift()
    }
    return { 
      locale: locale, 
      post: await app.$content('/'+locale+'/blog').get(route.path)
    }
  },
  computed: { 
    imgDir () {
      if (this.locale === 'en') {
        return '/img'+this.post.permalink
      } else {
        // FIXME: If we ever have locales like nl-be, this will break as is assumes 2 character locales
        return '/img'+this.post.permalink.substr(3)
      }
    }
  },
  mounted: function() {
    this.$store.commit('setDynamicComponent', {
      region: 'rightColumn', 
      component: 'fs-right-column-blogpost'
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
