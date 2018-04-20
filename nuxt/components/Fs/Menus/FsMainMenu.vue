<template>
  <v-list>
    <v-list-tile @click="docsSubMenu = !docsSubMenu">
      <v-list-tile-action>
        <v-icon color="info">extension</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('community') }}
        <v-icon color="secondary" class="ml-1" v-if="docsSubMenu">arrow_drop_up</v-icon>
        <v-icon color="secondary" class="ml-1" v-else>arrow_drop_down</v-icon>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <div v-if="docsSubMenu">
      <v-list-tile><b class="ml-3">{{ $t('forUsers') }}</b></v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>info_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t('community') }}
          <v-icon class="ml-1" v-if="docsSubMenu">arrow_drop_up</v-icon>
          <v-icon class="ml-1" v-else>arrow_drop_down</v-icon>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile><b class="ml-3">{{ $t('forContributors') }}</b></v-list-tile>
    </div>

    <v-list-tile :to="$fs.path('/search')">
      <v-list-tile-action>
        <v-icon>search</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('search') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile :to="$fs.path('/docs')">
      <v-list-tile-action>
        <v-icon>import_contacts</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('documentation') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-tile :to="$fs.path('/blog')">
      <v-list-tile-action>
        <v-icon>rss_feed</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('blog') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    
    <v-list-tile :to="$fs.path('/patterns')">
      <v-list-tile-action>
        <v-icon>content_paste</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('patterns') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

  </v-list>
</template>

<script>
export default {
  data: function() {
    return {
      docsSubMenu: false
    }
  }
}
</script>
