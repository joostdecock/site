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
        <fs-link to="/patterns">
          {{ $t('mainMenu.patterns') }} 
        </fs-link>
      </li>
    </ul>
    <h1 class="offset-xl1">{{ $t('patterns.title') }}</h1>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          class="xs6 xl4"
        v-for="pattern in list"
        :key="pattern.path"
        >
          <v-card>
            <v-card-media to="/" src="'/img/patterns/" height="300px">
		          <nuxt-link :to="pattern.permalink" style="width: 100%; height: 100%" :title="pattern.title"></nuxt-link>	
		      	</v-card-media>
            <v-card-text>
              <p class="mb-0 mt-0 thetitle">
		            <nuxt-link :to="pattern.permalink" :title="pattern.title">
		      				{{ pattern.title }}
		      	   	</nuxt-link>	
		      	  </p>
              <p class="mb-0 mt-2 thetagline">
		            <nuxt-link :to="pattern.permalink" :title="pattern.title">
		      				{{ pattern.tagline }}
		      	   	</nuxt-link>	
		      	  </p>
            </v-card-text>
          </v-card>
        <pre>
        {{ pattern.permalink }}
        {{ pattern.handle }}
        {{ pattern }} </pre>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import FsLink from '~/components/Fs/i18n/FsLink'
import test from '~/locales/en.json'
export default {
  layout: 'postlist',
  components: {
    FsLink
  },
    asyncData: async function ({ app, route }) {
      let locale = ''
      if(route.path.substr(0,9) === '/patterns') {
        locale = 'en'
      }
      else {
        locale = route.path.substr(1).split('/').shift()
        console.log(locale)
        locale = 'en'

      }
      let list = await app.$content('/'+locale+'/patterns').getAll() 
      console.log(test.showcase)
      return { list: list }
    },
    methods: {
      imgSrc: function (permalink, image) {
        if(permalink.substr(0, 5) === '/blog') {
          return '/img'+permalink+'/low_'+image
        } else {
          return '/img'+permalink.substr(3)+'/low_'+image
        }
      }
    }
}
</script>

<style scoped>
  p.thetitle {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.1;
  }
  p a {
    text-decoration: none;
  }
</style>
