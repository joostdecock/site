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
        <v-flex class="xs12 sm12 sm6 md6 xl4" v-for="post in posts" :key="post.permalink" >
            <div class="preview">
              <nuxt-link :to="post.permalink" :title="post.title"><span class="fs-block-link"></span></nuxt-link>
              <img :src="imgSrc(post.permalink, post.img)" alt="post.title" class="elevation-1"/>
              <div class="title">
                <p class="mb-0 mt-0 thetitle">
                  {{post.title}}
                  <span class="meta">{{ $fs.daysAgo(post.date) }} {{ $t('by') }} @{{post.author}}
                    <br>
                    <template v-for="cat in categories(post.category)">
                      <span :key="cat" class="ml-2">#{{cat}}</span>
                    </template>
                  </span>
                </p>
              </div>
            </div>
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
        return '/img'+permalink+'/med_'+image
      } else {
        return '/img'+permalink.substr(3)+'/low_'+image
      }
    },
    categories: function(cats) {
      if(typeof cats === 'string') return [cats]
      else return cats
    }
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
div.preview {
  position: relative;
}
div.preview img {
  max-width: 100%;
  border-radius: 4px;
}
div.title {
  position: absolute;
  bottom: 30px;
  right: 0px;
}
div.title p {
  background: #0009;
  font-size: 32px;
  color: #fff;
  padding: 8px 16px;
  margin: 0;
  text-align: right;
  display: inline-block;
  font-weight: 300;
  line-height: 1.1;
}
.meta {
  display: block;
  font-size: 60%;
  margin-top: 6px;
  color: #FFFB;
}
@media (max-width: 600px) {
  div.title p {
    font-size: 22px;
  }
}
@media (min-width: 601px) {
  div.title p {
    font-size: 26px;
  }
}
@media (min-width: 960px) {
  div.title p {
    font-size: 22px;
  }
}
@media (min-width: 1264px) {
  div.title p {
    font-size: 26px;
  }
}
</style>
