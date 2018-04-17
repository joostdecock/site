<template>
  <section>
    <ul class="breadcrumbs"> 
      <li>
        <nuxt-link :to="$fs.path('/')">
          <v-icon color="primary">home</v-icon>
        </nuxt-link>
      </li>
      <li><v-icon small slot="divider">chevron_right</v-icon></li>
      <li>{{ $t('showcase') }}</li>
    </ul>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex class="xs6 xl4" v-for="post in posts" :key="post.permalink" >
          <v-card>
            <v-card-media to="/" :src="imgSrc(post.permalink, post.img)" :height="imageHeight">
              <nuxt-link :to="post.permalink" style="width: 100%; height: 100%" :title="post.title"></nuxt-link>	
            </v-card-media>
            <v-card-text>
              <p class="mb-0 mt-0 thetitle">
              <nuxt-link :to="post.permalink" :title="post.title">
                {{ post.title }}
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
  layout: 'wide',
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
  },
  computed: {
    imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '220px'
        case 'sm': return '290px'
        case 'md': return '350px'
        case 'lg': return '340px'
        case 'xl': return '350px'
      }
    }
  }
}
</script>

<style scoped>
p.thetitle {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.1;
}
p.thetitle a {
  text-decoration: none;
}
@media (max-width: 600px) {
  p.thetitle {
    font-size: 0.6rem;
  }
}
</style>
