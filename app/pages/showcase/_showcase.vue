<template>
<section>
    <router-link to="/">Home</router-link> / 
    <router-link to="/showcase">Showcase</router-link> / 
    {{ post.linktitle }}
  <h1 class="post-title">{{ post.title }} </h1>
  <nuxtent-body :body="post.body" />
</section>
</template>

<script>
export default {
    asyncData: async function ({ app, route }) {
        return { post: await app.$content('/en/showcase').get(route.path)}
    }
}
</script>
