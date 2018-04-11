<template>
  <div>
    <v-card>
      <v-card-title>
        <div>
          <div class="display-1">{{ $t('showcaseInfo') }}</div>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon color="secondary">date_range</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ post.date | moment("D MMMM YYYY") }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="localePrefix+'/showcase/author/'+post.author">
          <v-list-tile-action>
            <v-icon color="primary">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ post.author }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="localePrefix+'/showcase/category/'+post.category">
          <v-list-tile-action>
            <v-icon color="primary">book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ post.category }}</v-list-tile-title>
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
            <p class="mt-2 body-1 text-xs-right mb-0 mt-0">{{ update.date | moment("from") }}</p>
          </div>
        </v-card-title>
      </div>
    </v-card>
  </div>
</template>

<script>
export default { 
  name: 'FsRightColumnShowcase',
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
