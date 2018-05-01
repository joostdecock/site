<template>
  <fs-wrapper-login-required v-if="$route.params.model">
    <fs-breadcrumbs :crumbs="crumbs">
      <span v-html="(loading) ? $t('draftingPattern', {pattern: $fs.ucfirst(pattern)}) : $t('chooseYourOptions')"></span>
    </fs-breadcrumbs>
    <h1 class="text-xs-center"
      v-html="(loading) ?
      $t('draftingPattern', {pattern: $fs.ucfirst(pattern)}) :
      $t('step3')+': '+$t('chooseYourOptions')"></h1>
    <div v-if="loading">
      <fs-draft-ticker :ready="ready" :error="error" />
      <fs-message-error-please-report v-if="error" />
    </div>
    <div v-else>
		<v-stepper class="mb-5" value="3">
			<v-stepper-header class="fs-nodeco">
        <v-stepper-step step="1" complete>
          <nuxt-link :to="$fs.path('/draft/')">
            {{ $t('draftingPattern', {pattern: patternName }) }}
          </nuxt-link>
        </v-stepper-step>
				<v-divider></v-divider>
        <v-stepper-step step="2" complete>
				  <nuxt-link :to="$fs.path('/draft/'+$route.params.pattern)">
            {{ $t('forUsername', { username: $store.state.user.models[model].name}) }}
          </nuxt-link>
        </v-stepper-step>
				<v-divider></v-divider>
        <v-stepper-step step="3">{{ $t('chooseYourOptions') }}</v-stepper-step>
			</v-stepper-header>
		</v-stepper>
    <p class="text-xs-center">
      <v-btn round outline @click="submit()">
        {{ $t('draftPatternForModel', {
          pattern: $fs.ucfirst(pattern),
          model: $store.state.user.models[model].name}
        ) }}
        </v-btn>
    </p>
    <fs-draft-configurator :pattern="pattern" :model="model" />
    </div>
    <p class="text-xs-center mt-5">
      <v-btn color="primary" large @click="submit()" :disabled="loading">
        <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="(24)" :width="(2)"></v-progress-circular>
        <v-icon class="mr-3" v-else>insert_drive_file</v-icon>
        {{ $t('draftPatternForModel', {
          pattern: $fs.ucfirst(pattern),
          model: $store.state.user.models[model].name}
        ) }}
      </v-btn>
    </p>
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
  computed: {
    model: function() {
      return this.$route.params.model
    },
    pattern: function() {
      return this.$route.params.pattern
    },
    patternName: function() {
      return this.$fs.ucfirst(this.$route.params.pattern)
    },
    models: function() {
      if(!this.$store.state.loggedIn) return false
      if(!this.$route.params.model) return false
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
  mounted () {
    if(this.$store.state.user.loggedIn && this.$route.params.model) {
      this.$store.dispatch('initializeDraft', {
        model: this.$route.params.model,
        pattern: this.$route.params.pattern,
        type: 'draftFromModel'
      })
    }
  },
  data: function() {
    return {
      error: false,
      ready: false,
      loading: false,
      crumbs: [
        {
          to: this.$fs.path('/draft/'),
          title: this.$t('newPatternDraft', { pattern: this.$fs.ucfirst(this.$route.params.pattern) })
        },
        {
          to: this.$fs.path('/draft/'+this.$route.params.pattern),
          title: this.$t('forUsername', { username: this.$store.state.user.models[this.$route.params.model].name })
        }
      ]
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
      let data = await this.$fs.draft()
      if(data.result === 'ok') {
        self.ready = true
        self.$router.push(self.$fs.path('/drafts/'+data.handle))
      } else {
        self.error = true
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
