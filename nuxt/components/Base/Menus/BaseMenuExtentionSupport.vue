<template>
  <v-list> 
    <v-list-tile href="https://gitter.im/freesewing/freesewing" target="_BLANK">
      <v-list-tile-action>
        <base-logo :size="(24)" color="#212121" />
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('chatWithUs') }}</v-list-tile-title>
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
    }  
  }
</script>
