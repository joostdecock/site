<template>
  <fs-wrapper-login-required :callback="forkInit()">
    <fs-breadcrumbs :crumbs="crumbs">
      <span v-html="(loading) ? $t('draftingPattern', {pattern: $fs.ucfirst(patternName)}) : $t('chooseYourOptions')"></span>
    </fs-breadcrumbs>
    <h1 class="text-xs-center"
        v-html="(loading) ?
        $t('draftingPattern', {pattern: $fs.ucfirst(patternName)}) :
        $t('step3')+': '+$t('chooseYourOptions')">
    </h1>
    {{ $route.name }}
    <div v-if="loading">
      <fs-draft-ticker :ready="ready" :error="error" />
        <fs-message-error-please-report v-if="error" />
    </div>
    <div v-else>
      <v-stepper class="mb-5" value="3">
        <v-stepper-header class="fs-nodeco">
          <v-stepper-step step="1" complete>
            <nuxt-link :to="$fs.path('/fork/')">
              {{ $t('forkDraftHandle', {handle: $route.params.draft+' ('+$fs.ucfirst(patternName)+')' }) }}
            </nuxt-link>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" complete>
            <nuxt-link :to="$fs.path('/fork/'+$route.params.draft)">
              {{ $t('forUsername', { username: modelName}) }}
            </nuxt-link>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">{{ $t('chooseYourOptions') }}</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      <p class="text-xs-center">
      <v-btn round outline @click="submit()">
        {{ $t('draftPatternForModel', { pattern: $fs.ucfirst(patternName), model: modelName}) }}
      </v-btn>
      </p>
      <fs-draft-configurator :pattern="$store.state.draft.gist.pattern" :model="$route.params.model" />
        <p class="text-xs-center mt-5">
        <v-btn color="primary" large @click="submit()" :disabled="loading">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="(24)" :width="(2)"></v-progress-circular>
          <v-icon class="mr-3" v-else>insert_drive_file</v-icon>
          {{ $t('draftPatternForModel', {
          pattern: $fs.ucfirst(patternName),
          model: modelName}
          ) }}
        </v-btn>
        </p>
    </div>
      </fs-wrapper-login-required>
</template>

<script>
import FsWrapperLoginRequired from '~/components/stateless/FsWrapperLoginRequired'
import FsDraftConfigurator from '~/components/stateful/FsDraftConfigurator'
import FsBreadcrumbs from '~/components/stateless/FsBreadcrumbs'
import FsDraftTicker from '~/components/stateless/FsDraftTicker'
import FsMessageErrorPleaseReport from '~/components/stateless/FsMessageErrorPleaseReport'

export default {
  layout: 'wide',
  components: {
    FsWrapperLoginRequired,
    FsDraftConfigurator,
    FsBreadcrumbs,
    FsDraftTicker,
    FsMessageErrorPleaseReport
  },
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  computed: {
    modelName () {
      if(typeof this.$store.state.user.models[this.$route.params.model] !== 'undefined') {
        return this.$store.state.user.models[this.$route.params.model].name
      } else {
        return this.$route.params.model
      }
    },
    patternName () {
      if(typeof this.$store.state.draft.gist.pattern !== 'undefined') {
        return this.$store.state.draft.gist.pattern
      } else {
        return this.$route.params.draft
      }

    },
    crumbs () {
      let mname = ''
      if(typeof this.$store.state.user.models[this.$route.params.model] !== 'undefined') {
        mname = this.$store.state.user.models[this.$route.params.model].name
      } else {
        mname = this.$route.params.model
      }
      return [
      {
        to: this.$fs.path('/fork/'),
        title: this.$t('forkDraftHandle', { handle: this.$route.params.draft })
      },
      {
        to: this.$fs.path('/fork/'+this.$route.params.draft),
        title: this.$t('forUsername', { username: mname })
      }
      ]
    },
  },
  data: function() {
    return {
      modelHandle: this.$route.params.model,
      model: this.$store.state.user.models[this.$route.params.model],
      error: false,
      ready: false,
      loading: false,
      initialized: false
    }
  },
  methods: {
    submit: async function() {
      this.crumbs.push({
        to: this.$fs.path('/draft/'+this.$route.params.pattern+'/for/'+this.$route.params.model),
        title: this.$t('chooseYourOptions')
      })
      this.loading = true
      const self = this
      this.$fs.draft()
      .then((data) => {
        self.ready = true
        self.$router.push(self.$fs.path('/drafts/'+data.handle))
      })
      .catch((error) => {
        self.error = true
      })
    },
    forkInit: function() {
      if(this.initialized === false  && typeof this.$store.state.user.models[this.$route.params.model] !== 'undefined') {
        this.$fs.initializeFork(this.$route.params.draft, this.$route.params.model)
        this.initialized = true
      }
    }
  }
}
</script>

<style scoped>
p.quick-pick {
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
