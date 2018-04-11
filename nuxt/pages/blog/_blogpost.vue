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
// Dynamic
export default {
  components: {
    FsBreadcrumbsBlog,
  },
  methods: {
    authorLink: function () {
      return '/blog/author/'+this.post.author.replace(/\s/g,''); 
    },
  },
  asyncData: async function ({ app, route }) {
    return { 
      locale: app.i18n.locale, 
      post: await app.$content('/'+app.i18n.locale+'/blog').get(route.path)
    }
  },
  computed: { 
    imgDir () {
      if (this.$i18n.locale === 'en') {
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
