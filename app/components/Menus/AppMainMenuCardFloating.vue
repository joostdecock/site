<template>
  <v-flex lg2 xl2 mr-3 hidden-md-and-down id="floated-main-menu">
    <AppMainMenuCard />
  </v-flex>
</template>

<script>
  import AppMainMenuCard from '~/components/Menus/AppMainMenuCard'
  export default {
    components: {
      AppMainMenuCard
    },
    name: 'AppMainMenuCardFloating'
  }
</script>

<style scoped>
  #floated-main-menu {
    position: sticky;
    top: 10px;
    align-self: flex-start;
  }
</style>
