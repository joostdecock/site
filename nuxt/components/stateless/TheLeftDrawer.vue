<template>
  <v-navigation-drawer
    v-model="showLeftDrawer"
    app
    fixed
    temporary
  >
    <div style="display: flex; margin: 0; height: 100%">
      <fs-menu-main />
    </div>
  </v-navigation-drawer>
</template>

<script>
  import FsMenuMain from '~/components/stateless/FsMenuMain'
  export default {
    components: {
      FsMenuMain
    },
    name: 'TheLeftDrawer',
    computed: {
      showLeftDrawer: {
        get: function () {
          return this.$store.state.drawer.left
        },
        set: function (value) {
          if(value) this.$store.commit('showLeftDrawer')
          else this.$store.commit('hideLeftDrawer')
        }
      },
    },
  }
</script>
