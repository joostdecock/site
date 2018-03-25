<template>
  <v-navigation-drawer
    :value="showRightDrawer"
    app
    fixed
    clipped
    temporary
    :right="alwaysTrue"
  >
    <p>This is the right drawer</p>
    <AppSecondaryMenu />
  </v-navigation-drawer>
</template>

<script>
  import AppSecondaryMenu from '~/components/Menus/AppSecondaryMenu'
  export default {
    components: {
      AppSecondaryMenu
    },
    name: 'TheRightDrawer',
    computed: { 
      showRightDrawer () {
        return this.$store.state.drawer.right
      }
    },
    data () {
      return {
        alwaysTrue: true
      }
    }
  }
</script>
