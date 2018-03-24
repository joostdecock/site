<template>
  <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>All</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="item in items" :key="item" >
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          { icon: 'apps', title: 'Welcome', to: '/' },
          { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
        ],
      }
    }
  }
</script>

