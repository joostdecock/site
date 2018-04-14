<template>
  <v-app class="splash">
    <fs-top-toolbar color="transparent" light class="hidden-md-and-down"/>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed height="auto" class="hidden-lg-and-up">
      <fs-main-toolbar color="primary" :right="(false)" />
    </v-footer>
  </v-app>
</template>

<style>
#app.splash {
  background: #212121; 
  background-size: cover;
  background-position: center;
  background-image: url('/img/potm/potm.jpg');
}
</style>

<script>
import FsTopToolbar from '~/components/Fs/Toolbars/FsTopToolbar' 
import FsMainToolbar from '~/components/Fs/Toolbars/FsMainToolbar' 
export default {
  components: { 
    FsTopToolbar,
    FsMainToolbar,
  }
}
</script>

