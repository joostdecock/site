<template>
  <v-toolbar flat color="transparent">
    <v-spacer></v-spacer>
    <fs-button-signup />
    <fs-button-login />
    <fs-button-patron />
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
import FsButtonPatron from '~/components/stateless/FsButtonPatron'
import FsButtonSignup from '~/components/stateless/FsButtonSignup'
import FsButtonLogin from '~/components/stateless/FsButtonLogin'

export default {
  name: 'TheVisitorToolbar',
  components: {
    FsButtonPatron,
    FsButtonSignup,
    FsButtonLogin
  }
}
</script>


