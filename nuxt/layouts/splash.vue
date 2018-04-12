<template>
  <v-app class="splash">
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed height="auto">
      <fs-main-toolbar color="primary" />
    </v-footer>
  </v-app>
</template>

<script>
import FsMainToolbar from '~/components/Fs/Toolbars/FsMainToolbar' 
export default {
  components: { FsMainToolbar }
}
</script>

<style>
#app.splash {
  background: #663f95; 
  background-size: cover;
  background-position: center;
  background-image: url('/img/potm/potm.jpg');
}
</style>
