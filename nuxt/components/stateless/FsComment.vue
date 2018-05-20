<template>
  <div class="comment">
    <v-card>
      <v-toolbar icon="chat_bubble" flat card dense :color="getColor()" :dark="getDark()" height="32">
        <v-toolbar-title><small>
            <nuxt-link :to="comment.page+'#comment-'+comment.id" :class="(getDark()) ? 'fs-white' : ''">{{ $fs.daysAgo(comment.time) }}</nuxt-link>
            {{ $t('by') }}
            <nuxt-link :to="$fs.userPath(comment.username)" :class="(getDark()) ? 'fs-white' : ''">@{{ comment.username }}</nuxt-link>
          </small>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text v-html="$fs.md.render(''+comment.comment)"></v-card-text>
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
    },
    patron: {
      type: String,
      default: '0'
    }
  },
  methods: {
    getColor: function() {
      if(this.patron === '2') return 'warning'
      if(this.patron === '4') return 'accent'
      if(this.patron === '8') return 'primary'
      return 'transparent'
    },
    getDark: function() {
      if(this.patron === '2') return 'warning'
      if(this.patron === '4') return true
      if(this.patron === '8') return true
      return false
    }
  }
}
</script>
