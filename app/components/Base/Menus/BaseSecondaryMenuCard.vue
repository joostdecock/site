<template>
  <v-card>
   <v-card-title primary-title>
     <div>
       <div class="display-1">{{ $t('site.title') }}</div>
       <div class="subheading">{{ $t('site.slogan') }}</div>
     </div>
   </v-card-title>
   <v-divider></v-divider>
   <slot></slot>
 </v-card>
</template>

<script>
  export default { name: 'BaseSecondaryMenuCard' }
</script>
