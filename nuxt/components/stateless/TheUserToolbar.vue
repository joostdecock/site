<template>
  <v-toolbar flat color="white">
    <v-spacer></v-spacer>
    <nuxt-link :to="$fs.path('/draft')">
      <v-btn large flat>
        <v-icon class="mr-3" color="success">insert_drive_file</v-icon>
        {{ $t('newDraft') }}
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="$fs.path('/model')">
      <v-btn large flat>
        <v-icon class="mr-3" color="accent">perm_identity</v-icon>
        {{ $t('newModel') }}
      </v-btn>
    </nuxt-link>
    |
    <nuxt-link :to="$fs.path('/drafts')">
      <v-btn large flat>
        <v-icon class="mr-3">folder</v-icon>
        {{ $t('drafts') }}
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="$fs.path('/models')">
      <v-btn large flat>
        <v-icon class="mr-3">perm_contact_calendar</v-icon>
        {{ $t('models') }}
      </v-btn>
    </nuxt-link>
    <nuxt-link :to="$fs.path('/account')">
      <v-btn large flat>
        <v-icon class="mr-3">settings</v-icon>
        {{ $t('settings') }}
      </v-btn>
    </nuxt-link>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
