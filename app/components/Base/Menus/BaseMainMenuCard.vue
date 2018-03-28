<template>
  <v-card>
   <v-card-title primary-title>
     <div>
       <div class="display-1">{{ $t('site.title') }}</div>
       <div class="subheading">{{ $t('site.slogan') }}</div>
     </div>
   </v-card-title>
   <v-divider></v-divider>
   <base-menu-extention-signup />
   <v-divider></v-divider>
   <app-main-menu />
   <v-divider></v-divider>
   <base-menu-extention-support />

 </v-card>
</template>

<script>
  import AppMainMenu from '~/components/App/Menus/AppMainMenu'
  import BaseMenuExtentionSignup from '~/components/Base/Menus/BaseMenuExtentionSignup'
  import BaseMenuExtentionSupport from '~/components/Base/Menus/BaseMenuExtentionSupport'
  export default {
    components: {
      AppMainMenu,
      BaseMenuExtentionSignup,
      BaseMenuExtentionSupport
    },
    name: 'BaseMainMenuCard'
  }
</script>
