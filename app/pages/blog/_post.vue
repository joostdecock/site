<template>
<section class="container">
    <router-link to="/">Home</router-link> / 
    <router-link to="/blog">Blog</router-link> / 
    {{ post.linktitle }}
  <h1 class="post-title">{{ post.title }} </h1>
  <nuxtent-body :body="post.body" />
</section>
</template>

<script>
export default {
    asyncData: async function ({ app, route }) {
        return { post: await app.$content('/').get(route.path)}
    }
}
</script>
