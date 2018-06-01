<template>
  <fs-wrapper-login-required v-if="$route.params.draft">
    <fs-breadcrumbs :crumbs="crumbs">{{ $t('chooseAModel') }}</fs-breadcrumbs>
    <h1 class="text-xs-center">{{ $t(mode+'DraftHandle', {handle: draft.handle}) }}</h1>
    <h2 class="text-xs-center">{{ $t('chooseAModel') }}</h2>
  <p class="text-xs-center">
    <v-btn
       outline
       round
       v-for="model in models.valid"
       :key="model"
       color="primary"
       :to="$fs.path('/'+mode+'/'+fork+'/for/'+model)"
       >{{ $store.state.user.models[model].name }}</v-btn>
    </p>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex class="xs4 sm3 xl2" v-for="model in models.valid" :key="model">
          <v-card>
            <nuxt-link :to="$fs.path('/'+mode+'/'+fork+'/for/'+model)" :title="model">
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
    <div v-if="models.invalid.length > 0">
      <v-divider class="mt-5"></v-divider>
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
    fork: function() {
      return this.$route.params.draft
    },
    models: function() {
      if(!this.$store.state.user.loggedIn) return false
      var valid = []
      var invalid = []
      for (let model of Object.keys(this.$store.state.user.models)) {
        if (this.$fs.modelIsValid(this.$store.state.user.models[model], this.$fs.patternHandle(this.draft.pattern))) {
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
        to: (this.$route.name.substr(0,4) === 'fork') ? this.$fs.path('/fork') : this.$fs.path('/redraft'),
        title: (this.$route.name.substr(0,4) === 'fork') ?  this.$t('forkDraftHandle', {handle: this.$route.params.draft}) : this.$t('redraftDraftHandle', {handle: this.$route.params.draft})

      }],
      mode: (this.$route.name.substr(0,4) === 'fork') ? 'fork' : 'redraft'
    }
  },
  asyncData: async function ({ app, route }) {
    return app.$fs.loadDraft(route.params.draft)
    .then((data) => {
      return data
    })
    .catch((error) => {
      if(error.reason === 'no_such_draft') {
        return {notFound: true}
      } else {
        return {error: true}
      }
    })
  }
}
</script>
