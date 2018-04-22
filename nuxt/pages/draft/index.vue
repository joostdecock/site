<template>
  <section>
    <div v-if="!$auth.loggedIn">
      <base-login-required />
    </div>
    <div v-else>
      <ul class="breadcrumbs"> 
        <li>
          <nuxt-link :to="$fs.path('/')">
            <v-icon color="primary">home</v-icon>
          </nuxt-link>
        </li>
        <li><v-icon small slot="divider">chevron_right</v-icon></li>
        <li>{{ $t('newDraft') }}</li>
      </ul>
      <h1 class="text-xs-center">{{ $t('step1') }}: {{ $t('chooseAPattern') }}</h1>
      <v-stepper class="mb-5">
        <v-stepper-header>
          <v-stepper-step step="1">{{ $t('chooseAPattern') }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">{{ $t('chooseAModel') }}</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">{{ $t('chooseYourOptions') }}</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      <p class="quick-pick">{{ $t('quickPick')}}:<br> 
      <template v-for="namespace in $fs.conf.namespaces">
        <span class="link-spacer ml-1" v-for="pattern in namespace" :key="pattern">
          <nuxt-link :to="$fs.path('/draft/'+pattern)">{{ pattern }}</nuxt-link>
        </span> 
      </template>
      </p>
      <v-container fluid grid-list-lg v-for="(namespace, index) in $fs.conf.namespaces" :key="index">
        <v-layout row wrap>
          <v-flex class="xs4 sm3 xl2" v-for="pattern in namespace" :key="pattern" >
            <v-card>
              <nuxt-link :to="$fs.path('/draft/'+pattern)" :title="pattern">
                <img :src="'/img/patterns/'+pattern+'/cover.jpg'" />
              </nuxt-link>	
            <v-card-text class="fs-nodeco">
              <h5 class="mb-0 mt-0 thetitle">
                <nuxt-link :to="$fs.path('/draft/'+pattern)" :title="pattern">
                  {{ pattern[0].toUpperCase() + pattern.slice(1) }}
                </nuxt-link>	
              </h5>
            </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </section>
</template>

<script>
import FsMessageLoginRequired from '~/components/stateless/FsMessageLoginRequired'

export default {
  layout: 'wide',
  components: {
    FsMessageLoginRequired
  }
}
</script>

<style scoped>
p.quick-pick {
  text-transform: capitalize;
  font-size: 80%;
  max-width: 600px;
  margin: auto;
  text-align: center;
  margin-bottom: 15px;
}
span.link-spacer {
  display: inline;
}
span.link-spacer:after {
  content: ', ';
}
p.quick-pick span:last-of-type:after {
  content: '';
}
.thetitle {
  text-align: center;
}
</style>
