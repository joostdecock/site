<template>
  <section>
    <router-link to="/">Home</router-link> / 
      <h1>Blog posts</h1>
        <ul>
            <li v-for="post in posts" :key="post.permalink">
                <router-link :to="post.permalink">{{ post.title }} - {{ post.permalink }}</router-link>
            </li>
        </ul>
  </section>
</template>

<script>

export default {
    asyncData: async function ({ app, route }) {
        var list =  await app.$content('/en/blog').getAll();
        return { posts: list }
    }
}
</script>
