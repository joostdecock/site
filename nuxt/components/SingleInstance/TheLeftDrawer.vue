<template>
  <v-navigation-drawer
    v-model="showLeftDrawer"
    class="pt-5"
    app
    fixed
    temporary
  >
    <div class="align-drawer-bottom">
      <FsMainMenu />
      <div class="fs-toolbar-spacer"></div>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import FsMainMenu from '~/components/Fs/Menus/FsMainMenu'
  export default {
    components: {
      FsMainMenu
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
