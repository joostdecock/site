<template>
  <div>
    <v-card>
      <v-card-title class="fs-card-title">
            {{ $t('showcaseInfo') }}
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
            <fs-icon-tshirt color="#848484"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <nuxt-link v-for="cat in post.category" :to="$fs.path('/showcase/category/'+cat)" :key="cat" class="mr-2">#{{cat}}</nuxt-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
    <v-card v-if="updates" class="mt-3">
      <v-card-title primary-title>
        <div class="display-1">{{ $t('updates') }}</div>
      </v-card-title>
      <div v-for="(update, id) in updates" :key="id">
        <v-divider></v-divider>
        <v-card-title>
          <div>
            <h3 class="title mb-2 mt-0">{{ update.title }}</h3>
            <p class="mt-0 mb-0"><small>{{ update.update }}</small></p>
            <p class="mt-2 body-1 text-xs-right mb-0 mt-0">{{ update.date }}</p>
          </div>
        </v-card-title>
      </div>
    </v-card>
  </div>
</template>

<script>
import FsIconTshirt      from '~/components/stateless/FsIconTshirt'
export default {
  name: 'FsDynamicAsideShowcase',
  components: {
    FsIconTshirt
  },
  computed: {
    post () {
      return this.$store.state.components.data['showcase']
    },
    localePrefix () {
      return this.$store.state.localePrefix
    },
    updates () {
      return this.$store.state.components.data['showcase'].updates
    }
  }
}
</script>
