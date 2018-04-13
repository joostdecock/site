<template>
  <v-card>
   <v-card-title class="fs-primary">
     <nuxt-link to="/" class="text-xs-center" style="width: 100%;" >
       <base-logo :size="(128)" />
     </nuxt-link>
   </v-card-title>
   <v-divider></v-divider>
   <base-menu-extention-signup />
   <v-divider></v-divider>
   <fs-main-menu />
   <v-divider></v-divider>
   <base-menu-extention-support />

 </v-card>
</template>

<script>
  import FsMainMenu from '~/components/Fs/Menus/FsMainMenu'
  import BaseMenuExtentionSignup from '~/components/Base/Menus/BaseMenuExtentionSignup'
  import BaseMenuExtentionSupport from '~/components/Base/Menus/BaseMenuExtentionSupport'
  import BaseLogo from '~/components/Base/Branding/BaseLogo'
  export default {
    components: {
      FsMainMenu,
      BaseMenuExtentionSignup,
      BaseMenuExtentionSupport,
      BaseLogo
    },
    name: 'BaseMainMenuCard'
  }
</script>
