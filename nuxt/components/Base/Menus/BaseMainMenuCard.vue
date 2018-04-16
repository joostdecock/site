<template>
  <v-card>
   <v-card-title class="fs-primary">
     <nuxt-link to="/" class="text-xs-center" style="width: 100%;" >
       <base-logo :size="(128)" />
     </nuxt-link>
   </v-card-title>
   <div v-if="!$auth.loggedIn">
     <base-menu-extention-signup />
     <v-divider></v-divider>
   </div>
   <fs-main-menu />
   <v-divider></v-divider>
   <base-menu-extention-patron />
 </v-card>
</template>

<script>
  import FsMainMenu from '~/components/Fs/Menus/FsMainMenu'
  import BaseMenuExtentionSignup from '~/components/Base/Menus/BaseMenuExtentionSignup'
  import BaseMenuExtentionPatron from '~/components/Base/Menus/BaseMenuExtentionPatron'
  import BaseLogo from '~/components/Base/Branding/BaseLogo'
  export default {
    components: {
      FsMainMenu,
      BaseMenuExtentionSignup,
      BaseMenuExtentionPatron,
      BaseLogo
    },
    name: 'BaseMainMenuCard'
  }
</script>
