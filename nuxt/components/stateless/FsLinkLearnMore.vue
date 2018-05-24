<template>
  <v-alert value="true" type="info" icon="book"><b>{{ $t('learnMore')}}:</b>
    <nuxt-link :to="$fs.path(to)" class="fs-white ml-2"><slot></slot></nuxt-link>
  </v-alert>
</template>

<script>
export default {
  name: 'FsLinkLearnMore',
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>

