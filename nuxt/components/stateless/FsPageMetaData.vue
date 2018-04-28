<template>
  <ul class="fs-metadata">
    <li v-if="date !== ''">
      <v-chip color="white">
        <v-icon class="mr-2">access_time</v-icon>
        {{ date }}
      </v-chip>
    </li>
    <li v-if="category != ''">
      <v-chip color="white">
        <v-icon class="mr-2">label_outline</v-icon>
        <nuxt-link :to="$fs.path('/blog/category/'+category)">
          {{ category }}
        </nuxt-link>
      </v-chip>
    </li>
    <li v-if="pattern != ''">
      <v-btn flat :to="$fs.path('/showcase/pattern/'+pattern)">
        <v-icon class="mr-3">label_outline</v-icon>
        {{ $fs.ucfirst(pattern) }}</v-btn>
    </li>
    <li v-if="author != ''">
      <v-btn flat nuxt :to="$fs.user(author)">
        <v-icon class="mr-3">account_circle</v-icon>
        @{{ author }}
      </v-btn>
    </li>
    <li v-if="translation != ''">
      <v-btn flat nuxt :to="$fs.user(translation)">
        <v-icon class="mr-3">translate</v-icon>
        @{{ translation }}
      </v-btn>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FsPageMetaData',
  props: {
    author: {
      type: String,
      required: true
    },
    date: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    },
    pattern: {
      type: String,
      default: ''
    },
    translation: {
      type: String,
      default: ''
    }
  }
}
</script>
