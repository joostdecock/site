<template>
  <section>
    <ul class="breadcrumbs"> 
      <li>
        <nuxt-link :to="$fs.path('/')">
          <v-icon color="primary">home</v-icon>
        </nuxt-link>
      </li>
      <li><v-icon small slot="divider">chevron_right</v-icon></li>
      <li>{{ $t('blog') }}</li>
    </ul>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex class="xs12 sm6 xl4" v-for="post in posts" :key="post.permalink" >
          <v-card>
            <v-card-media to="/" :src="imgSrc(post.permalink, post.img)" :height="imageHeight">
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
    <blockquote class="i18n center mt-5" v-if="$i18n.locale != $i18n.fallbackLocale">
      <h5>Not all blog posts have been translated to English — but you could change that</h5>
      <p>We are looking for people to help with our translation efforts.</p>
      <p>Many hands make light work, and it's excellent karma to make a contribution this way.</p>
      <p>To learn more about what you can do, and how to do it, click the link below.</p>
      <p class="text-xs-right">
      <v-btn color="primary" large>
        <v-icon>translate</v-icon>FIXME
      </v-btn>
      </p>
    </blockquote>
  </section>
</template>

<script>
export default {
  layout: 'wide',
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
