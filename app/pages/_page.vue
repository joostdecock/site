<template>
<section>
    <router-link to="/">Home</router-link> / 
    {{ page.title }}
  <h1>{{ page.title }}</h1>
  <nuxtent-body :body="page.body" />
</section>
</template>

<script>
export default {
    asyncData: async function ({ app, route }) {
        console.log('Getting '+route.path+' from content api')
        return { page: await app.$content('/pages').get(route.path)}
    }
}
</script>
