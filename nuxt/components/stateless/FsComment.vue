<template>
  <div>
    <v-card class="comment">
      <v-toolbar flat card dense :class="'patron-'+comment.patron" :height="(32)">
        <v-toolbar-title>
          <small>
            {{ $fs.daysAgo(comment.time) }}
            {{ $t('by') }}
            <nuxt-link :to="$fs.userPath(comment.username)">@{{ comment.username }}</nuxt-link>
          </small>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <nuxt-link :to="comment.page+'#comment-'+comment.id" :id="'comment-'+comment.id" class="anchor">🔗</nuxt-link>
      </v-toolbar>
      <v-card-text v-html="$fs.md.render(comment.comment+' ')"></v-card-text>
      <v-card-actions v-if="$store.state.user.loggedIn">
        <v-spacer></v-spacer>
        <v-btn v-if="!reply" flat color="primary" @click="reply=true">{{ $t('reply') }}</v-btn>
      </v-card-actions>
    </v-card>
    <div v-if="reply" class="interact">
      <v-text-field name="reply" id="reply" v-model="msg" autofocus textarea solo autoGrow></v-text-field>
      <p class="text-xs-right mt-2 mb-5">
        <v-btn color="primary" outline @click="reply=false"> {{ $t('cancel') }}</v-btn>
        <v-btn color="primary" @click="postReply()">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="(20)" :width="(2)"></v-progress-circular>
          <span v-else>{{ $t('postReply') }}</span>
        </v-btn>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FsComment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      loading: false,
      reply: false,
      msg: ''
    }
  },
  methods: {
    postReply: function() {
      this.loading = true
      this.error = false
      const data = {
        page: this.$route.path,
        parent: this.comment.id,
        comment: this.msg
      }
      this.$fs.postComment(data)
      .then((res) => {
        this.loading = false
        if(res.result === 'ok') {
          this.reply = false;
          this.$emit('newComment')
      }
      })
      .catch((error) => {
        this.error = true
        this.loading = false
        this.reason = error.reason
      })
    }
  }
}
</script>

<style scoped>
a.anchor {
  font-size: 90%;
  text-decoration: none;
}
.patron-0 {
  background: #FFF;
  color: #212121;
  border-bottom: 3px solid #C0C0C0;
}
.patron-2 {
  background: #C0C0C0;
  color: #212121;
  border-bottom: 3px solid #F90;
}
.patron-2 a {
  color: #212121;
}
.patron-4 {
  background: #F90;
  color: #fff;
  border-bottom: 3px solid #212121;
}
.patron-4 a {
  color: #fff;
}
.patron-8 {
  background: #212121;
  color: #fff;
  border-bottom: 3px solid #FF5B77;
}
.patron-8 a {
  color: #fff;
}
div.interact {
  margin: 1.5rem 4px 3rem;
}
</style>
