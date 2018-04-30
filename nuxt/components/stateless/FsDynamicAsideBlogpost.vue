<template>
  <div>
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
