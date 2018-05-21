<template>
  <section>
    <div v-for="(comment, i) in comments" :key="i" class="comment-thread" :class="(comment.parent == 0) ? 'top-level' : ''">
      <fs-comment :comment="comment" v-on:newComment="newCommentPosted()"/>
        <div class="reply" v-if="Object.keys(comment.replies).length > 0" >
          <fs-comment-thread v-on:newComment="newCommentPosted()" :comments="comment.replies" />
        </div>
    </div>
  </section>
</template>

<script>
import FsComment from '~/components/stateless/FsComment'
import FsCommentThread from '~/components/stateless/FsCommentThread'

export default {
  name: 'FsCommentThread',
  components: {
    FsComment,
    FsCommentThread
  },
  props: {
    comments: {
      type: [Array, Object],
      required: true
    }
  },
  methods: {
    newCommentPosted() {
      console.log('new comment in thread')
      this.$emit('newComment')
    }
  }
}
</script>

<style scoped>
div.comment-thread {
  margin-left: 4px;
}
div.reply {
  margin-top: -16px;
  padding-top: 5px;
  margin-left: 4px;
  border-left: 2px solid #848484;
}
div.top-level {
  margin-bottom: 2rem;
}
</style>
