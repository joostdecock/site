import FsConf from '~/static/json/freesewing.json'

export const state = () => ({
  user: {
    loggedIn: false,
    isPatron: false,
    isAdmin: false,
    account: {},
    models: {},
    drafts: {}
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
    defaults: {
      options: {},
      sa: {},
      scope: {},
      theme: 'Basic'
    },
    config: {
      options: {},
      sa: {},
      scope: {},
      theme: 'Basic'
    },
    pattern: '',
    model: {
      handle: '',
      measurements: {}
    },
    type: '',
    custom: {}
  }
})

export const mutations = {
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
  setDraftInitial(state, payload) {
    state.draft = payload
  },
  setDraftOption(state, payload) {
    state.draft.config.options[payload.name] = payload.value
  },
  setDraftSa(state, payload) {
    state.draft.config.sa = {
      type: payload.type,
      value: payload.value
    }
  },
  setDraftScope(state, payload) {
    state.draft.config.scope = {
      type: payload.type,
      included: {...payload.included}
    }
  },
  setDraftTheme(state, payload) {
    state.draft.config.theme = payload
  },
  setDraftCustomOptionsCount(state, payload) {
    state.draft.custom = payload
  },
  setAccount(state, payload) {
    state.user = payload
  }
}

export const actions = {
  resetAccount( { commit }) {
    commit('setAccount', {
      loggedIn: false,
      isPatron: false,
      isAdmin: false,
      account: {},
      models: {},
      drafts: {}
    })
  },
  initializeAccount( { commit }, payload) {
    payload.loggedIn = true
    payload.isPatron = (typeof payload.account === 'Object' && payload.account.tier) ?  true : false
    payload.isAdmin = (payload.account.role === 'admin') ?  true : false
    commit('setAccount', payload)
  },
  initializeDraft( { commit, state }, payload) {
    const config = {
      options: {}
    }
    const measurements = {}
    if(payload.type === 'draftFromModel') {
      for (let optionName in payload.pattern.options) {
        if(payload.pattern.options[optionName].type === 'measure') {
          if(state.user.account.units === 'imperial') {
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
      measurements[measurementName] = payload.model.data.measurements[measurementName]
    }
    if(typeof payload.pattern.seamAllowance !== 'undefined') {
      config.sa = {
        type: 'pattern'+state.user.account.units,
        value: payload.pattern.seamAllowance[state.user.account.units]
      }
    } else {
      config.sa = {
        type: state.user.account.units,
        value: (state.user.account.units === 'imperial') ? 0.625 : 1
      }
    }
    config.scope = {
      type: 'pattern',
      included: []
    }
    config.theme = 'Basic'
    commit('setDraftInitial', {
      type: payload.type,
      model: {
        handle: payload.model.handle,
        measurements: measurements
      },
      pattern: payload.pattern.info.handle,
      config: config,
      defaults: JSON.parse(JSON.stringify(config)),
      custom: {}
    })
  },
  updateDraftCustomOptionsCount( { commit, state } ) {
    let custom = {}
    for (var group in FsConf.patterns[state.draft.pattern].optiongroups) {
      custom[group] = 0
        for (let index in FsConf.patterns[state.draft.pattern].optiongroups[group]) {
          let option = FsConf.patterns[state.draft.pattern].optiongroups[group][index]
            if(state.draft.config.options[option] != state.draft.defaults.options[option]) {
              custom[group]++
            }
        }
    }
    commit('setDraftCustomOptionsCount', custom)
  },
  draftOptionUpdate( { commit, dispatch }, payload) {
    commit('setDraftOption', payload)
    dispatch('updateDraftCustomOptionsCount')
  }
}

