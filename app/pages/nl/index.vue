<template>
  <section class="container">
    <h1>{{ $t('site.title') }} </h1>
      <h2>{{ $t('site.slogan') }} </h2>
      <ul>
          <li><LangLink to="/blog">Blog index</LangLink></li> 
          <li><nuxt-link to="/showcase">Showcase index</nuxt-link></li> 
          <li><nuxt-link to="/contact">Contact page</nuxt-link></li> 
          <li><nuxt-link to="/about">About page</nuxt-link></li> 
      </ul>
      <ul>
          <li><nuxt-link to="/en">English</nuxt-link></li> 
          <li><nuxt-link to="/nl">Nederlands</nuxt-link></li> 
      </ul>
      <hr>
        <ul>
            <li v-for="page in pages" :key="page.path">
                <router-link :to="page.path">{{ page.path }}</router-link>
                <!-- <pre>{{ page}}</pre> -->
            </li>
        </ul>

      <pre>{{ items }}</pre>  
      <pre>{{ sections }}</pre>  
      <pre>{{ pages }}</pre>  
</section>
</template>

<script>
import LangLink from '~/components/i18n/LangLink'
export default {
  components: {
  LangLink
},
    created() {
        this.$router.options.routes.forEach(route => {
            this.items.push({
                name: route.name
                , path: route.path
            })
        })
    },
    computed: { 
      locale () {
        return this.$store.state.locale
      }
    },
    data() {
        return {
            items: [] 
        }
    },
    asyncData: async function ({ app, route }) {
        var sections =  await app.$content('/').getAll();
        var pages =  await app.$content('/pages').getAll();
        return { sections: sections, pages: pages }
    }

}
</script>
