<template>
  <ul style="margin:0" class="mt-4">
    <li v-for="(t, badge) in badges" :key="badge" style="list-style-type: none; display: inline; padding: 3px;">
      <img class="elevation-1" :src="'/img/badges/badge-'+badge+'.svg'" :width="size" :height="size" style="border-radius: 50%" /></li>
  </ul>
</template>

<script>
export default {
  name: 'FsBadgeList',
  props: {
    badges: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 42
    }
  }
}
</script>
