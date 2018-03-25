<template>
  <section class="container">
    <h1>{{ $t('site.title') }} </h1>
      <h2>{{ $t('site.slogan') }} </h2>
      <ul>
          <li><LangLink to="/blog">Blog index</LangLink></li> 
          <li><LangLink to="/showcase">Showcase index</LangLink></li> 
          <li><LangLink to="/contact">Contact page</LangLink></li> 
          <li><LangLink to="/about">About page</LangLink></li> 
      </ul>
      <ul>
          <li><nuxt-link to="/en">English</nuxt-link></li> 
          <li><nuxt-link to="/nl">Nederlands</nuxt-link></li> 
      </ul>
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
    }
}
</script>

<style>
.container {
  max-width: 800px;
  padding: 2rem;
  margin: 3rem auto;
  font-size: 140%;
  line-height: 1.5;
}
h1 {
  margin: 2rem auto;
    font-size: 3rem;
    font-weight: 100;
    line-height: 1.1;
}
</style>
