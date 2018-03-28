<template>
  <section class="blogpost">
    <app-breadcrumbs-blog :title="post.linktitle" />
      <figure>
        <a href='#'>
          <img 
            :src="'/img'+post.permalink+'/high_'+post.img" 
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
      <div class="meta"> 
        By 
        <app-link :to="authorLink">{{ post.author }}</app-link>
        , on {{ post.date }} in <app-link :to="'/blog/category/'+post.category">{{ post.category }}</app-link>
      </div>
      <nuxtent-body :body="post.body" class="fs-content fs-text" />
          <pre>{{ post }}</pre>
  </section>
</template>

<script>
import AppBreadcrumbsBlog from '~/components/App/Navigation/AppBreadcrumbsBlog'
import AppLink from '~/components/App/i18n/AppLink'
export default {
  components: {
    AppBreadcrumbsBlog,
    AppLink
  },
  methods: {
    authorLink: function () {
      return '/blog/author/'+this.post.author.replace(/\s/g,''); 
    } 
  },
  asyncData: async function ({ app, route }) {
    return { post: await app.$content('/en/blog').get(route.path)}
  }
}
</script>
