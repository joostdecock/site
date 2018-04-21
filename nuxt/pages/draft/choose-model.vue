<template>
  <fs-wrapper-login-required> 
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
      <li>{{ $t('chooseAModel')}}</li>
		</ul>
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

      <p class="quick-pick">{{ $t('quickPick')}}:<br> 
        <template v-for="model in models.valid">
          <span class="link-spacer ml-1" :key="'span-'+model">
					<nuxt-link :to="$fs.path('/draft/'+pattern+'/for/'+model)" :key="'link-'+model">{{ $auth.user.models[model].name }}</nuxt-link>
        </span> 
        </template>
				</p>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
				<v-flex class="xs4 sm3 xl2" v-for="model in models.valid" :key="model">
					<v-card>
						<nuxt-link :to="$fs.path('/draft/'+pattern+'/for/'+model)" :title="model">
							<img :src="$fs.conf.api.data+$auth.user.models[model].pictureSrc" />
						</nuxt-link>	
					<v-card-text class="fs-nodeco">
						<h5 class="mb-0 mt-0 thetitle">
							<nuxt-link :to="$fs.path('/draft/'+pattern+'/for/'+model)" :title="model">
								{{ $auth.user.models[model].name }}
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
export default {
	layout: 'wide',
  components: {
    FsWrapperLoginRequired
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
