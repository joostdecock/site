<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="display-1">{{ $t('blog.postInfo') }}</div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="secondary">access_time</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ post.date }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="localePrexix+'/blog/author/'+post.author">
          <v-list-tile-action>
            <v-icon color="accent">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ post.author }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="localePrexix+'/blog/category/'+post.category">
          <v-list-tile-action>
            <v-icon color="accent">book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ post.category }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-badge color="success">
              <span slot="badge">{{ post.comments }}</span>
              <v-icon color="accent">mode_comment</v-icon>
            </v-badge> 
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-html="$tc('blog.comments', post.comments, { count: post.comments})"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
    <v-card v-if="updates" class="mt-4">
      <v-card-title primary-title>
        <div class="display-1">{{ $t('blog.updates') }}</div>
      </v-card-title>
      <div v-for="update in updates" :key="update">
        <v-divider></v-divider>
        <v-card-title>
          <div>
            <h3 class="title mb-2 mt-0">{{ update.title }}</h3>
            <p class="body-2 mt-0 mb-0">{{ update.update }}</p>
            <p class="mt-2 body-1 text-xs-right mb-0 mt-0">{{ update.date }}</p>
          </div>
        </v-card-title>
        <v-card-options>
        </v-card-options>
      </div>
    </v-card>
  </div>
</template>

<script>
export default { 
  name: 'AppRightColumnBlogpost',
  computed: { 
    post () {
      return this.$store.state.components.data['blogpost']
    },
    localePrefix () {
      return this.$store.state.localePrefix
    },
    updates () {
      return this.$store.state.components.data['blogpost'].updates
    }
  }
}
</script>
