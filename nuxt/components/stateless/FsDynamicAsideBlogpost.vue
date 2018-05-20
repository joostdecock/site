<template>
  <div>
    <v-card>
      <v-card-title class="fs-card-title">
            {{ $t('postInfo') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="secondary">date_range</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $fs.daysAgo(post.date) }} ({{ post.date }})
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="secondary">face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><nuxt-link :to="$fs.userPath(post.author)">@{{ post.author }}</nuxt-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="secondary">book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <nuxt-link :to="$fs.path('/blog/category/'+post.category)">#{{post.category}}</nuxt-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
    <v-card class="mt-3">
      <v-card-title class="fs-card-title">
            {{ $t('contents') }}
      </v-card-title>
      <v-divider></v-divider>
        <fs-table-of-contents :toc="post.toc"/>
    </v-card>
    <v-card v-if="updates" class="mt-3">
      <v-card-title class="fs-card-title">
          {{ $t('updates') }}
      </v-card-title>
      <div v-for="(update, id) in updates" :key="id">
        <v-divider></v-divider>
        <v-card-title>
          <div>
            <h3 class="title mb-2 mt-0">{{ update.title }}</h3>
            <p class="mt-0 mb-0 body-2" v-html="$fs.md.render(update.update)"></p>
            <p class="mt-2 body-1 text-xs-right mb-0 mt-0">
              {{ update.date }}
              <span v-if="update.by">{{ $t('by') }} <nuxt-link :to="$fs.userPath(update.by)">@{{ update.by }}</nuxt-link></span>
            </p>
          </div>
        </v-card-title>
      </div>
    </v-card>
  </div>
</template>

<script>
import FsTableOfContents from '~/components/stateless/FsTableOfContents'
export default {
  name: 'FsDynamicAsideBlogpost',
  components: {
    FsTableOfContents
  },
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
