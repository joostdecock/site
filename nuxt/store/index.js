export const state = () => ({
    freesewing: {
        site: {
            repo: 'https://github.com/joostdecock/site'
        }
    },
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    locale: 'en',
    localePrefix: '',
    drawer: {
        left: false,
        right: false
    },
    components: {
        dynamic: {
            rightColumn: '',
            rightDrawer: '',
        },
        data: { } 
    },
    draft: {
        config: {
          options: {},
          measurements: {},
          sa: {}
        },
        pattern: '',
        model: '',
        type: ''
    }
})

export const mutations = {
    setLocale(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
                if(state.locale == state.defaultLocale) state.localePrefix = ''
                else state.localePrefix = '/'+state.locale
        }
    },
    showLeftDrawer(state) {
        state.drawer.left = true
    },
    hideLeftDrawer(state) {
        state.drawer.left = false
    },
    showRightDrawer(state) {
        state.drawer.right = true
    },
    hideRightDrawer(state) {
        state.drawer.right = false
    },
    toggleDrawer(state, side) {
        state.drawer[side] = !state.drawer[side]
    },
    setDynamicComponent(state, payload) {
        state.components.dynamic[payload.region] = payload.component
    },
    setComponentData(state, payload) {
        state.components.data[payload.source] = {}
        state.components.data[payload.source] = payload.data
    },
    initializeDraft(state, payload) {
        const config = {
            options: {},
            measurements: {}
        }
        if(payload.type === 'draftFromModel') {
            for (let optionName in payload.pattern.options) {
                if(payload.pattern.options[optionName].type === 'measure') {
                  if(this.$auth.user.account.units === 'imperial') {
                    // Store in inch
                    config.options[optionName] = payload.pattern.options[optionName].default/25.4
                  } else {
                    // Store in cm
                    config.options[optionName] = payload.pattern.options[optionName].default/10
                  }
                } else {
                  config.options[optionName] = payload.pattern.options[optionName].default
                }
            }
        }
        for (let measurementName in payload.model.data.measurements) {
            config.measurements[measurementName] = payload.model.data.measurements[measurementName]
        }
        if(typeof payload.pattern.seamAllowance !== 'undefined') {
          config.sa = {
            type: 'pattern'+this.$auth.user.account.units,
            value: payload.pattern.seamAllowance[this.$auth.user.account.units]
          }
        } else {
          config.sa = {
            type: this.$auth.user.account.units,
            value: (this.$auth.user.account.units === 'imperial') ? 0.625 : 1
          }
        }
        state.draft = {
            type: payload.type,
            model: payload.model.handle,
            pattern: payload.pattern.info.handle,
            config: config
        }
    },
    setDraftOption(state, payload) {
      state.draft.config.options[payload.name] = payload.value
    },
    setDraftSa(state, payload) {
      console.log('Setting SA to '+payload.type)
      state.draft.config.sa = { 
        type: payload.type,
        value: payload.value
      }
    }
}
