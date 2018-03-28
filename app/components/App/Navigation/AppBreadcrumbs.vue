<template>
  <div>
    <v-breadcrumbs divider="/">
      <v-breadcrumbs-item
        v-for="item in items"
        :key="item.permalink"
      >
        {{ item.tile }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: 'AppBreadcrumbs',
  props: {
    items: { type: Array }
  }
}
</script>
