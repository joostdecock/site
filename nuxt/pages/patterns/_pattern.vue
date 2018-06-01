<template>
  <section>
    <v-container>
      <fs-breadcrumbs-pattern :title="pattern.info.name" />
        <h1 class="text-xs-center">{{ pattern.info.name }}</h1>
        <v-layout row wrap class="mt-5 mb-5">
          <v-flex xl3 offset-xl3 lg3 md4 sm5 offset-sm1 offset-md2 offset-lg3 xs12 class="px-2">
            <v-btn :to="$fs.path('/draft/'+pattern.info.handle)" color="primary" large block>
              <v-icon class="mr-3">gesture</v-icon>
              {{ $t('draftPattern', { pattern: pattern.info.handle[0].toUpperCase() + pattern.info.handle.slice(1) }) }}
            </v-btn>
          </v-flex>
          <v-flex xl3 lg3 md4 sm5 xs12 class="px-2">
            <v-btn :to="$fs.path('/docs/patterns/'+pattern.info.handle)" large block>
              <v-icon class="mr-3">import_contacts</v-icon>
              {{ $t('documentation') }}
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex sm6 xs12>
            <p>{{ pattern.info.description }}</p>
            <img :src="'/img/patterns/'+pattern.info.handle+'/cover.jpg'" />
          </v-flex>
          <v-flex sm6 xs12>
            <v-slider 
              readonly 
              prepend-icon="accessibility" 
              color="info" 
              :value="5*Object.keys(pattern.measurements).length" 
              :hint="Object.keys(pattern.measurements).length+' '+$t('measurements')"
              :persistent-hint="(true)"
            ></v-slider>
            <v-slider 
              readonly 
              prepend-icon="tune" 
              color="success" 
              :value="2*Object.keys(pattern.options).length" 
              :hint="Object.keys(pattern.options).length+' '+$t('patternOptions')"
              :persistent-hint="(true)"
              ></v-slider>
            <v-slider 
              readonly 
              prepend-icon="tune" 
              color="warning" 
              :value="5*Object.keys(pattern.parts).length" 
              :hint="Object.keys(pattern.parts).length+' '+$t('patternParts')"
              :persistent-hint="(true)"
            ></v-slider>
            <v-slider 
              readonly 
              prepend-icon="content_cut" 
              color="accent" 
              :value="10*pattern.info.level" 
              :hint="$t('difficulty')+' '+pattern.info.level"
              :persistent-hint="(true)"
            ></v-slider>
          </v-flex>
        </v-layout>
    </v-container>
    <v-container fluid grid-list-lg v-if="examples.length>0">
      <v-layout row wrap>
        <v-flex class="xs6 xl4" v-for="post in examples" :key="post.permalink" >
          <v-card>
            <nuxt-link :to="post.permalink" :title="post.title">
              <img :src="imgSrc(post.permalink, post.img)" />
            </nuxt-link>	
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
import FsBreadcrumbsPattern from '~/components/stateless/FsBreadcrumbsPattern'
// Dynamic
export default {
  layout: 'wide',
  components: {
    FsBreadcrumbsPattern,
  },
  computed: { 
    pattern () {
      return this.$fs.conf.patterns[this.$route.params.pattern]
    }
  },
  asyncData: async function ({ app, route }) {
    const examples = []
    let allExamples = await app.$content('/'+app.i18n.locale+'/showcase').getAll()
    for (const example of allExamples) {
      if(example.category === route.params.pattern) {
        examples.push(example)
      }
    }
    return {  examples: examples }
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
