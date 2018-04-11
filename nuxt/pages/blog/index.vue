<template>
  <section>
    <ul class="breadcrumbs"> 
      <li>
        <fs-link to="/">
          <v-icon color="primary">home</v-icon>
        </fs-link>
      </li>
      <li><v-icon small slot="divider">chevron_right</v-icon></li>
      <li>
        <fs-link to="/blog">
          {{ $t('blog') }} 
        </fs-link>
      </li>
    </ul>
    <h1 class="offset-xl1">{{ $t('blog.title') }}</h1>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          class="xs6 xl4"
        v-for="post in posts"
        :key="post.permalink"
        >
          <v-card>
            <v-card-media to="/" :src="imgSrc(post.permalink, post.img)" height="300px">
		          <nuxt-link :to="post.permalink" style="width: 100%; height: 100%" :title="post.title"></nuxt-link>	
		      	</v-card-media>
            <v-card-text>
              <p class="mb-0 mt-0 thetitle">
		            <nuxt-link :to="post.permalink" :title="post.title">
		      				{{ post.linktitle }}
		      	   	</nuxt-link>	
		      	  </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  layout: 'postlist',
    asyncData: async function ({ app, route }) {
      let locale = ''
      if(route.path.substr(0,5) === '/blog') {
        locale = 'en'
      }
      else {
        locale = route.path.substr(1).split('/').shift()
      }
        var list =  await app.$content('/'+app.i18n.locale+'/blog').getAll();
        return { posts: list }
    },
    methods: {
      imgSrc: function (permalink, image) {
        if(permalink.substr(0, 5) === '/blog') {
          return '/img'+permalink+'/low_'+image
        } else {
          return '/img'+permalink.substr(3)+'/low_'+image
        }
      },
    }
}
</script>

<style scoped>
  p.thetitle {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.1;
  }
  p.thetitle a {
    text-decoration: none;
  }
</style>
