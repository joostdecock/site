<template>
  <footer>
    <v-footer height="auto" class="primary">
      <v-layout row wrap justify-center class="mt-3 mb-5">
        <v-flex xs12 py-3 text-xs-center class="mb-4">
          <nuxt-link :to="$fs.path('/')"><fs-logo :size="(100)" color="#fff" /></nuxt-link>
            <p class="mt-5 mb-5">
              <nuxt-link :to="$fs.path('/support')" class="fs-white">{{ $t('getHelp') }}</nuxt-link> |
              <nuxt-link :to="$fs.path('/contact')" class="fs-white">{{ $t('contactUs') }}</nuxt-link>
              <br>
              <nuxt-link :to="$fs.path('/privacy')" class="fs-white">{{ $t('yourPrivacy') }}</nuxt-link> |
              <nuxt-link :to="$fs.path('/rights')" class="fs-white">{{ $t('yourRights') }}</nuxt-link>
            </p>
            <v-btn color="accent" :to="$fs.path('/patrons/join')" class="mt-1 mb-4"><v-icon class="mr-3">favorite</v-icon>{{ $t('becomeAPatron') }}</v-btn>
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
  line-height: 1.4;
  color: #fff6;
  padding: 0 8px;
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
