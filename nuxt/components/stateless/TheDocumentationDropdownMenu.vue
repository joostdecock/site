<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator">
      <v-btn large flat>
        <v-icon class="mr-3">import_contacts</v-icon>
        {{ $t('documentation') }}
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar-title>
    <v-list>
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
      <v-list-tile :to="$fs.path('/docs/fundamentals')">
        <v-list-tile-action><v-icon>motorcycle</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('fundamentals') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/designer/tutorial/part-1')">
        <v-list-tile-action><v-icon>gesture</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('learnToDesignPatterns') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/api')">
        <v-list-tile-action><v-icon>code</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('documentationForDevelopers') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$fs.path('/docs/api')">
        <v-list-tile-action><v-icon>translate</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('documentationForTranslators') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="$fs.path('/docs')">
        <v-list-tile-action><v-icon>book</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('documentationOverview') }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
