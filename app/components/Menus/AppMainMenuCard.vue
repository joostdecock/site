<template>
  <v-card class="mt-5">
   <v-card-title primary-title>
     <div>
       <div class="display-1">{{ $t('site.title') }}</div>
       <div class="subheading">{{ $t('site.slogan') }}</div>
     </div>
   </v-card-title>
   <v-divider></v-divider>
   <AppMainMenu />
 </v-card>
</template>

<script>
  import AppMainMenu from '~/components/Menus/AppMainMenu'
  export default {
    components: {
      AppMainMenu
    },
    name: 'AppMainMenuCard'
  }
</script>
