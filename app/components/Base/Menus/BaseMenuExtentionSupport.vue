<template>
  <v-list> 
    <v-list-tile @click="gotoChat">
      <v-list-tile-action>
        <base-logo :size="(24)" color="#663f95" />
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('mainMenu.chat') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import BaseLogo from '~/components/Base/Branding/BaseLogo'
  export default {
    name: 'BaseMenuExtentionSupport',
    components: {
      BaseLogo
    },  
    methods: {
      gotoChat: function() {
        window.location = 'https://gitter.im/freesewing/freesewing'
      } 
    }
  
  }
</script>
