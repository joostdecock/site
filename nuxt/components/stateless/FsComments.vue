<template>
  <section>
    <v-card v-for="(comment, i) in comments" :key="i">
      <fs-comment :comment="comment" />
    </v-card>
  </section>
</template>

<script>
import FsComment from '~/components/stateless/FsComment'
export default {
  name: 'FsComments',
  components: {
    FsComment
  },
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
