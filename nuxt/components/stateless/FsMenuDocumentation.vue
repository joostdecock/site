<template>
  <v-list :dense="dense" :class="dense ? 'fs-side-sub' : ''">
      <v-list-tile>
        <v-list-tile-content><b>{{ $t('forUsers') }}</b></v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/about')">
        <v-list-tile-action><v-icon>info_outline</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('aboutFreesewing') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/patterns')">
        <v-list-tile-action><v-icon>content_cut</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('patternDocumentation') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/measurements')">
        <v-list-tile-action><v-icon>accessibility</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('howToTakeMeasurements') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-content><b>{{ $t('forContributors') }}</b></v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/contribute')">
        <v-list-tile-action><v-icon>motorcycle</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('contributeToFreesewing') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/missing')">
        <v-list-tile-action><v-icon>gesture</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('learnToDesignPatterns') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/missing')">
        <v-list-tile-action><v-icon>code</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('documentationForDevelopers') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/i18n/')">
        <v-list-tile-action><v-icon>translate</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('documentationForTranslators') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="$fs.path('/docs')" exact>
        <v-list-tile-action><v-icon>book</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('documentationOverview') }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
</template>

<script>
export default {
  name: 'FsMenuDocumentation',
  props: {
    dense: Boolean
  }
}
</script>

