<template>
  <fs-wrapper-login-required>
    <fs-breadcrumbs :crumbs="crumbs">{{ $t('chooseAModel') }}</fs-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('step2') }}: {{ $t('chooseAModel') }}</h1>
    <v-stepper class="mb-5" value="2">
      <v-stepper-header class="fs-nodeco">
        <v-stepper-step step="1" complete>
          <nuxt-link :to="$fs.path('/draft/')">
            {{ $t('draftingPattern', {pattern: patternName }) }}
          </nuxt-link>
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2">{{ $t('chooseAModel') }}</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">{{ $t('chooseYourOptions') }}</v-stepper-step>
      </v-stepper-header>
    </v-stepper>

    <p class="text-xs-center">
    <v-btn
       outline
       round
       v-for="model in models.valid"
       :key="model"
       color="primary"
       :to="$fs.path('/draft/'+pattern+'/for/'+model)"
       >{{ $store.state.user.models[model].name }}</v-btn>
    </p>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex class="xs4 sm3 xl2" v-for="model in models.valid" :key="model">
          <v-card>
            <nuxt-link :to="$fs.path('/draft/'+pattern+'/for/'+model)" :title="model">
              <img :src="$fs.conf.apis.data+$store.state.user.models[model].pictureSrc" />
            </nuxt-link>
            <v-card-text class="fs-nodeco">
              <h5 class="mb-0 mt-0 text-xs-center">
                <nuxt-link :to="$fs.path('/draft/'+pattern+'/for/'+model)" :title="model">
                  {{ $store.state.user.models[model].name }}
                </nuxt-link>
              </h5>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider class="mt-5"></v-divider>
    <div v-if="models.invalid.length > 0">
      <p class="text-xs-center mt-3 fs-muted">
        {{ $t('txt-modelsWithMissingMeasurements') }}
      </p>
      <p class="text-xs-center mt-1">
      <v-btn
         outline
         round
         v-for="model in models.invalid"
         :key="model"
         color="secondary"
         :to="$fs.path('/draft/'+pattern+'/for/'+model)"
         >{{ $store.state.user.models[model].name }}</v-btn>
      </p>
    </div>
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
  },
  computed: {
    pattern: function() {
      return this.$route.params.pattern
    },
    patternName: function() {
      return this.$fs.ucfirst(this.$route.params.pattern)
    },
    models: function() {
      if(!this.$store.state.user.loggedIn) return { valid: {}, invalid: {}}
      var valid = []
      var invalid = []
      for (let model of Object.keys(this.$store.state.user.models)) {
        if (this.$fs.modelIsValid(this.$store.state.user.models[model], this.$route.params.pattern)) {
          valid.push(model)
        } else {
          invalid.push(model)
        }
      }
      return { valid: valid, invalid: invalid }
    }
  },
  data: function() {
    return {
      crumbs: [{
        to: this.$fs.path('/draft'),
        title: this.$t('newPatternDraft', { pattern: this.$fs.ucfirst(this.$route.params.pattern) })
      }]
    }
  }
}
</script>
