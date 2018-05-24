<template>
  <section>
    <h2 class="mt-5">{{ $t('comments')}}<a id="comments"></a></h2>
    <v-btn color="primary" @click="comment=true" v-if="!comment && $store.state.loggedIn">{{ $t('addComment') }}</v-btn>
    <v-btn color="primary" v-else :to="$fs.path('/login')"><v-icon class="mr-3">vpn_key</v-icon>{{ $t('logIn') }}</v-btn>
    <div v-if="comment" class="interact">
      <v-text-field name="comment" id="comment" v-model="msg" autofocus textarea solo autoGrow></v-text-field>
      <p class="text-xs-right mt-2 mb-5">
        <v-btn color="primary" outline @click="comment=false"> {{ $t('cancel') }}</v-btn>
        <v-btn color="primary" @click="postComment()">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="(20)" :width="(2)"></v-progress-circular>
          <span v-else>{{ $t('postComment') }}</span>
        </v-btn>
      </p>
    </div>
    <fs-comment-thread v-if="commentsReady" :comments="comments" v-on:newComment="loadComments()" :key="$route.path" />
      <v-btn v-if="!comment && comments.length>0" color="primary" href="#comments" @click="comment=true">{{ $t('addComment') }}</v-btn>
  </section>
</template>

<script>
import FsCommentThread from '~/components/stateless/FsCommentThread'
export default {
  name: 'FsPageComments',
  components: {
    FsCommentThread
  },
  data: () => {
    return {
      comments: {},
      loading: false,
      comment: false,
      commentsReady: false,
      msg: ''
    }
  },
  methods: {
    async loadComments() {
      this.commentsReady = false
      const self = this
      this.$fs.loadPageComments(this.$route.path)
      .then(function (data) {
        let ordered = []
        for(let i in data) {
          ordered.unshift(data[i])
        }
        self.comments = ordered
        self.commentsReady = true
      })
      .catch((error) => {
        console.log(error)
      })
    },
    postComment: function() {
      this.loading = true
      this.error = false
      const data = {
        page: this.$route.path,
        comment: this.msg
      }
      this.$fs.postComment(data)
      .then((res) => {
        this.loading = false
        if(res.result === 'ok') {
          this.comment = false;
          this.loadComments()
      }
      })
      .catch((error) => {
        this.error = true
        this.loading = false
        this.reason = error.reason
      })
    }
  },
  mounted: async function() {
    this.loadComments()
  }
}
</script>
