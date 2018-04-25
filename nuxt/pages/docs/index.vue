<template>
  <section>
    <router-link to="/">Home</router-link> / 
    <ul>
      <li v-for="page in pages" :key="page.permalink">
        <router-link :to="page.permalink">{{ page.title }} - {{ page.permalink }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
    asyncData: async function ({ app, route }) {
        var list =  await app.$content('/'+app.i18n.locale+'/docs').getAll();
        return { pages: list }
    }
}
</script>
