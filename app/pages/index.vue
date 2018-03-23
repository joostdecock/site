<template>
  <section class="container">
      <h1>Freesewing.org v2</h1>
      <h2>A port of the freesewing site to Nuxt</h2>
      <ul>
          <li><nuxt-link to="/blog">Blog index</nuxt-link></li> 
          <li><nuxt-link to="/showcase">Showcase index</nuxt-link></li> 
          <li><nuxt-link to="/contact">Contact page</nuxt-link></li> 
          <li><nuxt-link to="/about">About page</nuxt-link></li> 
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
export default {
    created() {
        this.$router.options.routes.forEach(route => {
            this.items.push({
                name: route.name
                , path: route.path
            })
        })

    }
    , data() {
        return {
            items: []
        }
    },
    asyncData: async function ({ app, route }) {
        var foo =  await app.$content('/').getAll();
        var foo2 =  await app.$content('/pages').getAll();
        return { sections: foo, pages: foo2 }
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
