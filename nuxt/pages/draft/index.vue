<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs>{{ $t('newDraft') }}</fs-breadcrumbs>
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
    <p class="text-xs-center">
    <template v-for="(namespace, ns) in $fs.conf.namespaces">
      <v-btn
        round
        outline
        v-for="pattern in namespace"
        :key="pattern"
        :color="(ns === 'Beta') ? 'secondary' : 'primary'"
        :to="$fs.path('/draft/'+pattern)"
        >{{ $fs.ucfirst(pattern) }}</v-btn>
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
            <h5 class="mb-0 mt-0 text-xs-center">
              <nuxt-link :to="$fs.path('/draft/'+pattern)" :title="pattern">
                {{ pattern[0].toUpperCase() + pattern.slice(1) }}
              </nuxt-link>
            </h5>
          </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'

export default {
  layout: 'wide',
  components: {
    FsWrapperLoginRequired,
    FsBreadcrumbs
  }
}
</script>
