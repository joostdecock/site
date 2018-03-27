<template>
  <section>
    <article>
      <h1>{{ page.title }}</h1>
      <nuxtent-body :body="page.body" />
    </article>
  </section>
</template>

<script>
export default {
    asyncData: async function ({ app, route }) {
        return { page: await app.$content('/en/docs').get(route.path)}
    },
}
</script>
