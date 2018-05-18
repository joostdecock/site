<template>
  <section>
    <v-card v-for="(c, i) in comments" :key="i">
      <v-card-text>
        {{ c.comment }}
        <pre>{{ c }}</pre>
      </v-card-text>
    </v-card>
    <pre>
      {{ comments }}
    </pre>
  </section>
</template>

<script>
export default {
  name: 'FsComments',
  data: () => {
    return {
      comments: {}
    }
  },
  mounted: async function() {
    const self = this
    this.$fs.loadPageComments()
    .then(function (data) {
      self.comments = data
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
</script>
