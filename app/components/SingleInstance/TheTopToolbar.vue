<template>
  <v-toolbar 
    fixed 
    app 
    dark
    color="primary"
    height="76"
    :prominent="alwaysTrue"
    :scroll-off-screen="alwaysTrue"
    >
    <v-toolbar-side-icon @click.stop="toggleMenu('left')"></v-toolbar-side-icon>
    <v-toolbar-title>{{ $t('site.title') }}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-menu :nudge-width="100">
      <v-toolbar-title slot="activator">
        <span>All</span>
        <v-icon dark>arrow_drop_down</v-icon>
      </v-toolbar-title>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.to" >
          <v-list-tile-title v-text="item"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn
      icon
      @click.stop="toggleMenu('right')"
    >
      <v-icon>menu</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'TheTopToolbar',
  data () {
    return {
      items: [
      { icon: 'apps', title: 'Welcome', to: '/' },
      { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      alwaysTrue: JSON.parse('true')
    }
  },
  methods: {
    toggleMenu: function(side) {
      this.$store.commit('toggleMenu', side)
    }
  }
}
</script>
