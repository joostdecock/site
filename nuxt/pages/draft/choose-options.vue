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
      <fs-draft-ticker :ticks="ticks"/>
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
export default {
	layout: 'wide',
  components: {
    FsWrapperLoginRequired,
    FsDraftConfigurator,
    FsBreadcrumbs,
    FsDraftTicker
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
      return []
    }
  },
  mounted () {
    if(this.$store.state.user.loggedIn && this.$route.params.model) {
      this.$store.dispatch('initializeDraft', {
        model: this.$store.state.user.models[this.model],
        pattern: this.$fs.conf.patterns[this.pattern],
        type: 'draftFromModel'
      })
    }
  },
  data: function() {
    return {
      error: false,
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
      ],
      ticks: {
        200: '<span class="fs-emoji">💀</span>'+this.$t('summoningTheSpiritsOfTheSkullAndNeedle'),
         800: '<span class="fs-emoji">🏃</span>'+this.$t('newTaskForUser', {user: '<span class="fs-info">@'+this.$store.state.user.account.username+'</span>'}),
        1100: '<span class="fs-emoji">👕</span>'+this.$t('patternIsPattern', {pattern: '<span class="fs-success">'+this.$fs.ucfirst(this.$route.params.pattern+'</span>')}),
        1300: '<span class="fs-emoji">💃🏽</span>'+this.$t('modelIsModel', {model: '<span class="fs-success">'+this.$store.state.user.models[this.$route.params.model].name+'</span>'}),
        2000: '<span class="fs-emoji">⚡</span>'+this.$t('connectingToSomeApi', {api: 'data'}),
        2300: '<span class="fs-emoji">👷</span><span class="fs-warning">[data]</span> '+this.$t('processingDraftOptions'),
        3000: '<span class="fs-emoji">🏋️</span><span class="fs-warning">[data]</span> '+this.$t('loadingModelData'),
        3300: '<span class="fs-emoji">⚡</span><span class="fs-warning">[data]</span> '+this.$t('connectingToSomeApi', {api: 'core'}),
        3700: '<span class="fs-emoji">⏩</span><span class="fs-warning">[data]</span> '+this.$t('submittingTaskToCore'),
        4000: '<span class="fs-emoji">📐</span><span class="fs-accent">[core]</span> '+this.$t('draftingPattern', {pattern: this.$route.params.pattern}),
        6000: '<span class="fs-emoji">📦</span><span class="fs-warning">[data]</span> '+this.$t('retrievingDraftFromCore'),
        6500: '<span class="fs-emoji">💾</span><span class="fs-warning">[data]</span> '+this.$t('storingDraftData'),
        7000: '<span class="fs-emoji">🎉</span>'+this.$t('taskCompleted'),
        7500: '<span class="fs-emoji">😘</span>'+this.$t('loadingResult')
      }
    }
  },
  methods: {
    submit: function() {
      self = this
      this.$fs.draft()
      .then((response) => {
        if(response.data.result === 'ok') {
          self.$router.push(self.$fs.path('/drafts/'+response.data.handle))
        } else {
          self.error = true
        }
      })
      .catch((error) => {
        this.error = true
      })
      this.crumbs.push({
        to: this.$fs.path('/draft/'+this.$route.params.pattern+'/for/'+this.$route.params.model),
        title: this.$t('chooseYourOptions')
      })
      this.loading = true
    }
  }
}
</script>
				<nuxt-link :to="$fs.path('/draft/'+$route.params.pattern)">
          {{ $t('forUsername', {username: $store.state.user.models[model].name}) }}

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
