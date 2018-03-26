<template>
  <section>
    <router-link to="/">Home</router-link> / 
        <h1>Showcases</h1>
        <ul>
            <li v-for="showcase in showcases" :key="showcase.permalink">
                <router-link :to="showcase.permalink">{{ showcase.title }} - {{ showcase.permalink }}</router-link>
            </li>
        </ul>
  </section>
</template>

<script>

export default {
    asyncData: async function ({ app, route }) {
        var list =  await app.$content('/nl/showcase').getAll();
        return { showcases: list }
    }
}
</script>
