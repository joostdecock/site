<template>
  <div class="m800">
    <template>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header"><h4>General</h4></div>
          <v-card>
            <v-card-text>
              <v-expansion-panel>
                <fs-option-sa :pattern="$fs.conf.patterns[pattern]" /> <!-- seam allowance -->
                <fs-option-scope :pattern="$fs.conf.patterns[pattern]" /> <!-- scope -->
                <!-- scope -->
                  <!--

                <v-expansion-panel-content>
                  <div slot="header">
                    <h6>{{ $t('patternParts') }}:
                      <span :class="(dflt.scope == config.scope) ? 'default' : 'custom'">
                        {{ (config.scope === 'complete') ? $t('completePattern') : $t('onlySelectedPatternParts') }}
                      </span>
                    </h6>
                  </div>
                  <v-card>
                    <v-card-text>
												<v-radio-group v-model="config.scope">
												  <v-radio
                            v-for="index in ['complete', 'custom']" :key="index"
												    :label="( index === 'custom') 
                              ? $t('onlySelectedPatternParts') 
                              : $t('completePattern')" 
                            :value="index"
                            :color="(index == dflt.scope) ? 'primary' : 'accent'" ></v-radio>
											  </v-radio-group>
                        <div v-if="config.scope === 'custom'">
                          <p>{{ $t('selectThePartsYouWantIncludedInYourDraft') }}</p>
                          <v-checkbox
                            v-for="(part, index) in $fs.conf.patterns[pattern].parts"
                            :key="index"
                            :label="index"
                            hide-details
                            v-model="customScope[index]"></v-checkbox>
                          <div class="mt-3">
                            <v-btn flat @click="scopeSetAll(true)">Check all</v-btn>
                            <v-btn flat @click="scopeSetAll(false)">Clear all</v-btn>
                          </div>

                        </div>
                      <p class="text-xs-right">
                        <v-btn flat large outline color="accent"
                          v-if="dflt.sa != config.sa"
                          @click="config.sa = dflt.sa"
                          >Reset to default</v-btn>
                        <v-btn flat large outline>show help</v-btn>
                      </p>
                    </v-card-text>
                  </v-card> 
                </v-expansion-panel-content> 
                -->

                <!-- theme -->
                <v-expansion-panel-content>
                  <div slot="header">
                    <h6>{{ $t('theme') }}:
                      <span :class="(dflt.theme == config.theme) ? 'default' : 'custom'">
                        {{ $t(config.theme) }}
                      </span>
                    </h6>
                  </div>
                  <v-card>
                    <v-card-text>
												<v-radio-group v-model="config.theme">
												  <v-radio
                            v-for="index in ['classic', 'paperless']" :key="index"
												    :label="$t(index)"
                            :value="index"
                            :color="(index == dflt.theme) ? 'primary' : 'accent'" ></v-radio>
											  </v-radio-group>
                      <p class="text-xs-right">
                        <v-btn flat large outline color="accent"
                          v-if="dflt.theme != config.theme"
                          @click="config.theme = dflt.theme"
                          >Reset to default</v-btn>
                        <v-btn flat large outline>show help</v-btn>
                      </p>
                    </v-card-text>
                  </v-card> 
                </v-expansion-panel-content> 

              </v-expansion-panel>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-for="(group, index) in $fs.conf.patterns[pattern].optiongroups" :key="index">
          <div slot="header"><h4>{{ index }}</h4></div>
          <v-card>
            <v-card-text>
              <v-expansion-panel>
                <template v-for="option in group">
                  
                  <fs-option-radio
                    v-if="options[option].type === 'chooseOne'"
                    :key="option"
                    :pattern="pattern"
                    :option="options[option]"
                    :dflt="''+options[option].default"
                  />

                  <fs-option-slider
                    v-else
                    :key="option"
                    :pattern="pattern"
                    :name="option"
                    :option="options[option]"
                    :dflt="(options[option].default)"
                  />

                </template>
              </v-expansion-panel>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <p class="text-xs-right">
      <v-btn color="primary" large>
        <v-icon class="mr-3">insert_drive_file</v-icon>
        {{ $t('draftPatternForModel', {
          pattern: $fs.ucfirst(pattern),
          model: $auth.user.models[model].name}
          ) }}</v-btn>
      </p>
    </template>
  </div>
</template>

<script>
import FsOptionSlider from '~/components/stateful/FsOptionSlider'
import FsOptionRadio from '~/components/stateful/FsOptionRadio'
import FsOptionSa from '~/components/stateful/FsOptionSa'
import FsOptionScope from '~/components/stateful/FsOptionScope'

export default {
  name: 'FsDraftConfigurator',
  components: {
    FsOptionSlider,
    FsOptionRadio,
    FsOptionSa,
    FsOptionScope,
  },
  props: {
    pattern: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
  },
  data: function() {
    const dflt = this.$fs.conf.patterns[this.pattern]
    dflt.sa = this.$auth.user.account.units
    dflt.scope = 'complete'
    dflt.theme = 'classic'
    const customScope = {}
    for (let part in this.$fs.conf.patterns[this.pattern].parts) {
      customScope[part] = true
    }
    const sa = {
      none: '',
      metric: ' (' + this.$fs.units.format(this.$fs.conf.defaults.sa.metric*10, 'metric', 'measure') + ')',
      imperial: ' (' + this.$fs.units.format(this.$fs.conf.defaults.sa.imperial, 'imperial', 'measure') + ')',
      custom: this.$fs.conf.defaults.sa.custom,
    }
    const c = { 
      options: {}, 
      sa: this.$auth.user.account.units,
      theme: 'classic',
      scope: 'complete' 
    }
    if (typeof this.$fs.conf.patterns[this.pattern].seamAllowance !== 'undefined') {
      sa.patternMetric = ' (' + this.$fs.units.format(this.$fs.conf.patterns[this.pattern].seamAllowance.metric, 'metric', 'measure') + ')'
      sa.patternImperial = ' (' + this.$fs.units.format(this.$fs.conf.patterns[this.pattern].seamAllowance.imperial, 'imperial', 'measure') + ')'
      c.sa = 'pattern'+this.$fs.ucfirst(this.$auth.user.account.units)
      dflt.sa = c.sa
    }
    for (let optionName in this.$fs.conf.patterns[this.pattern].options) {
      c.options[optionName] = this.$fs.conf.patterns[this.pattern].options[optionName].default
    }
    return {
      options: this.$fs.conf.patterns[this.pattern].options,
      config: c,
      dflt: dflt,
      sa: sa,
      customSa: 0,
      customScope: customScope
    }
  },
  methods: {
    scopeSetAll: function(val) {
      for (let part in this.$fs.conf.patterns[this.pattern].parts) {
        this.customScope[part] = val
      }
    }
  }
}
</script>

<style scoped>
  ul.expansion-panel {
    margin-left: 0;
  }
  .m800 {
    max-width: 800px;
    margin: auto;
  }
  span.default { color: #212121; }
  span.custom { color: #ff5b77; }
</style>
