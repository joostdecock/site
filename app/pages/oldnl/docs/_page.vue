<template>
  <section>
    <article>
      <h1>{{ page.title }}</h1>
      <nuxtdown-body :body="page.body" />
    </article>
  </section>
</template>

<script>
export default {
    asyncData: async function ({ app, route }) {
        return { page: await app.$content('/nl/docs').get(route.path)}
    },
}
</script>
