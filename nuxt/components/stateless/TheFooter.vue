<template>
  <footer>
  <v-footer height="auto" class="primary">
    <v-layout row wrap justify-center class="mt-3 mb-5">
      <v-flex xs12 py-3 text-xs-center class="mb-4">
        <fs-logo size="100" color="#fff" />
      </v-flex>
      <v-flex xs-6>
        <ul class="right">
          <li><nuxt-link :to="$fs.path('/help')" class="fs-white">{{ $t('help') }}</nuxt-link></li>
          <li><nuxt-link :to="$fs.path('/contact')" class="fs-white">{{ $t('contact') }}</nuxt-link></li>
        </ul>
      </v-flex>
      <v-flex xs-6>
        <ul class="left">
          <li><nuxt-link :to="$fs.path('/privacyhelp')" class="fs-white">{{ $t('privacy') }}</nuxt-link></li>
          <li><nuxt-link :to="$fs.path('/patrons/join')" class="fs-white">{{ $t('becomeAPatron') }}</nuxt-link></li>
        </ul>
      </v-flex>
      <v-flex xs12 py-3 text-xs-center>
        <p v-html="$t('txt-footer')"></p>
      </v-flex>
    </v-layout>
  </v-footer>
  </footer>
</template>

<script>
import FsLogo      from '~/components/stateless/FsLogo'

export default {
  name: 'TheFooter',
  components: { FsLogo }
}
</script>

<style scoped>
footer {
  margin-top: 65px;
  padding: 2rem 0 0 0;
  color: #fff;
}
ul, p{
  font-size: 16px;
  line-height: 1.2;
  color: #fff6;
}
a {
  color: #fff9;
  text-decoration: none;
}
a:hover {
  color: #fffc;
  text-decoration: none;
}
ul li {
  list-style-type: none;
}

ul.right {
  text-align: right;

}

</style>
