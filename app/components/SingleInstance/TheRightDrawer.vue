<template>
  <v-navigation-drawer
    v-model="showRightDrawer"
    app
    fixed
    class="pt-5"
    temporary
    :right="alwaysTrue"
  >
    <div class="align-drawer-bottom">
      <slot></slot>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import AppSecondaryMenu from '~/components/App/Menus/AppSecondaryMenu'
  export default {
    components: {
      AppSecondaryMenu
    },
    name: 'TheRightDrawer',
    computed: { 
      showRightDrawer: {
        get: function () {
          return this.$store.state.drawer.right
        },
        set: function (value) {
          if(value) this.$store.commit('showRightDrawer')
          else this.$store.commit('hideRightDrawer')
        }
      }
    },
    data () {
      return {
        alwaysTrue: true
      }
    }
  }
</script>
