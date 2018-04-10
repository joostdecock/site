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
        <fs-link to="/showcase">
          {{ $t('mainMenu.showcase') }} 
        </fs-link>
      </li>
    </ul>
    <h1 class="offset-xl1">{{ $t('showcase.title') }}</h1>
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import FsLink from '~/components/Fs/i18n/FsLink'
export default {
  layout: 'postlist',
  components: {
    FsLink
  },
    asyncData: async function ({ app, route }) {
      let locale = ''
      if(route.path.substr(0,9) === '/showcase') {
        locale = 'en'
      }
      else {
        locale = route.path.substr(1).split('/').shift()
      }
        var list =  await app.$content('/'+locale+'/showcase').getAll();
        return { posts: list }
    },
    methods: {
      imgSrc: function (permalink, image) {
        if(permalink.substr(0, 9) === '/showcase') {
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
