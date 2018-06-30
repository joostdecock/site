<template>
  <section>
    <fs-breadcrumbs>{{ $t('blog') }}</fs-breadcrumbs>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex class="xs12 sm12 md6 xl6" v-for="post in posts" :key="post.permalink" >
            <div class="preview">
              <nuxt-link :to="post.permalink" :title="post.title"><span class="fs-block-link"></span></nuxt-link>
              <img :src="imgSrc(post.permalink, post.img)" :alt="post.title" class="elevation-1"/>
              <div class="title">
                <p class="mb-0 mt-0 thetitle">
                  {{post.title}}
                  <span class="meta">{{ $fs.daysAgo(post.date) }} {{ $t('by') }} @{{post.author}} {{ $t('in') }} #{{ post.category}}</span>
                </p>
              </div>
            </div>
        </v-flex>
      </v-layout>
    </v-container>
    <blockquote class="i18n mt-5 fs-m800 fs-bq" v-if="$i18n.locale != $i18n.fallbackLocale">
      <h5>{{ $t('txt-missingBlogPosts') }}</h5>
      <p>{{ $t('txt-translators1') }}</p>
      <p>{{ $t('txt-translators2') }}</p>
      <p>{{ $t('txt-translators3') }}</p>
      <p class="text-xs-right">
      <v-btn color="primary" large>
        <v-icon class="mr-3">translate</v-icon>{{ $t('documentationForTranslators') }}
      </v-btn>
      </p>
    </blockquote>
  </section>
</template>

<script>

import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'

export default {
  layout: 'wide',
  components: {
    FsBreadcrumbs
  },
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
        return '/img'+permalink+'/med_'+image
      } else {
        return '/img'+permalink.substr(3)+'/med_'+image
      }
    },
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
