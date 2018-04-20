<template>
  <fs-users-only> 
		<ul class="breadcrumbs"> 
			<li>
				<nuxt-link :to="$fs.path('/')">
					<v-icon color="primary">home</v-icon>
				</nuxt-link>
			</li>
			<li><v-icon small slot="divider">chevron_right</v-icon></li>
			<li>
				<nuxt-link :to="$fs.path('/draft')">
          {{ $t('newPatternDraft', { pattern: patternName }) }}
				</nuxt-link>
			</li>
			<li><v-icon small slot="divider">chevron_right</v-icon></li>
      <li>
				<nuxt-link :to="$fs.path('/draft/'+$route.params.pattern)">
          {{ $t('forUsername', {username: $auth.user.models[$route.params.model].name}) }}
				</nuxt-link>
      </li>
			<li><v-icon small slot="divider">chevron_right</v-icon></li>
      <li>{{ $t('chooseYourOptions') }}</li>
		</ul>
    <h1 class="text-xs-center">{{ $t('step3') }}: {{ $t('chooseYourOptions') }}</h1>
		<v-stepper class="mb-5" value="3">
			<v-stepper-header class="fs-nodeco">
        <v-stepper-step step="1" complete>
          <nuxt-link :to="$fs.path('/draft/')">
            {{ $t('draftingPattern', {pattern: patternName }) }}
          </nuxt-link>
        </v-stepper-step>
				<v-divider></v-divider>
        <v-stepper-step step="2" complete>
          {{ $t('forUsername', { username: $auth.user.models[$route.params.model].name}) }}
        </v-stepper-step>
				<v-divider></v-divider>
        <v-stepper-step step="3">{{ $t('chooseYourOptions') }}</v-stepper-step>
			</v-stepper-header>
		</v-stepper>

      <p class="quick-pick">{{ $t('quickPick')}}:<br> fixme</p>
  </fs-users-only>
</template>

<script>
import FsUsersOnly from '~/components/FsUsersOnly'
export default {
	layout: 'wide',
  components: {
    FsUsersOnly
  },
  computed: {
    pattern: function() {
      return this.$route.params.pattern
    },
    patternName: function() {
      return this.$route.params.pattern[0].toUpperCase() + this.$route.params.pattern.slice(1)
    },
    models: function() {
      if(!this.$auth.loggedIn) return false
      var valid = []
      var invalid = []
      for (let model of Object.keys(this.$auth.user.models)) {
        if (this.$fs.modelIsValid(this.$auth.user.models[model], this.$route.params.pattern)) {
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
