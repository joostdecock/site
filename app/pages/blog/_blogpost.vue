<template>
<section>
    <router-link to="/">Home</router-link> / 
    <router-link to="/blog">Blog</router-link> / 
    {{ post.linktitle }}
  <h1>{{ post.title }} </h1>
  <nuxtent-body :body="post.body" />
</section>
</template>

<script>
export default {
    asyncData: async function ({ app, route }) {
        return { post: await app.$content('/en/blog').get(route.path)}
    }
}
</script>
