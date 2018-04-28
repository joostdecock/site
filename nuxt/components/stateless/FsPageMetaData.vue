<template>
  <ul class="fs-metadata">
    <li v-if="date !== ''">
      <v-btn flat>
        <v-icon class="mr-3">access_time</v-icon>
        {{ date }}
      </v-btn>
    </li>
    <li v-if="category != ''">
      <v-btn flat :to="$fs.path('/blog/category/'+category)">
      <v-icon class="mr-3">label_outline</v-icon>
        {{ category }}</v-btn>
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
