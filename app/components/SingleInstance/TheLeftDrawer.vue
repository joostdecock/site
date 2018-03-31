<template>
  <v-navigation-drawer
    v-model="showLeftDrawer"
    class="pt-5"
    app
    fixed
    temporary
  >
    <div class="align-drawer-bottom">
      <AppMainMenu />
      <div class="fs-toolbar-spacer"></div>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import AppMainMenu from '~/components/App/Menus/AppMainMenu'
  export default {
    components: {
      AppMainMenu
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
