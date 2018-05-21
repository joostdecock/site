<template>
  <div class="comment">
    <v-card>
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
      <v-card-actions>
        <img :src="'/img/patrons/medals/medal-'+comment.patron+'.svg'" class="medal" v-if="comment.patron>1" />
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
img.medal {
  height: 40px;
  margin-top: -5px;

}
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
</style>
