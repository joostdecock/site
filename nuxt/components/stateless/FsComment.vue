<template>
  <div class="comment">
    <v-card>
      <v-toolbar flat card dense :class="'patron-'+comment.patron" :height="(32)">
        <v-toolbar-title><small>
            <nuxt-link :to="comment.page+'#comment-'+comment.id">{{ $fs.daysAgo(comment.time) }}</nuxt-link>
            {{ $t('by') }}
            <nuxt-link :to="$fs.userPath(comment.username)">@{{ comment.username }}</nuxt-link>
          </small>
          {{ comment.patron }}  </v-toolbar-title>
      </v-toolbar>
      <v-card-text v-html="$fs.md.render(comment.comment+' ')"></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="primary">{{ $t('reply') }}</v-btn>
      </v-card-actions>
    </v-card>
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
  }
}
</script>

<style scoped>
.patron-0 {
  background: #ccc;
  color: #212121;
  border-bottom: 3px solid #999;
}
.patron-2 {
  background: #F90;
  color: #fff;
  border-bottom: 3px solid #64B5F6;
}
.patron-2 a {
  color: #fff;
}
.patron-4 {
  background: #FF5B77;
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
</style>
