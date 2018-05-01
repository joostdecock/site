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
  },
  selected: {
    drafts: [],
    models: []
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
    state.draft.config.patternOptions[payload.name] = payload.value
  },
  setDraftSa(state, payload) {
    state.draft.config.draftOptions.sa = {
      type: payload.type,
      value: payload.value
    }
  },
  setDraftScope(state, payload) {
    state.draft.config.draftOptions.scope = {
      type: payload.type,
      included: {...payload.included}
    }
  },
  setDraftTheme(state, payload) {
    state.draft.config.draftOptions.theme = payload
  },
  setDraftCustomOptionsCount(state, payload) {
    state.draft.custom = payload
  },
  setAccount(state, payload) {
    state.user = payload
  },
  setSelectedDrafts(state, payload) {
    state.selected.drafts = payload
  },
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
    payload.isPatron = (payload.account.patron.tier) ?  true : false
    payload.isAdmin = (payload.account.role === 'admin') ?  true : false
    commit('setAccount', payload)
  },
  unsetAccount( { commit }, payload) {
    payload.loggedIn = true
    payload.isPatron = (typeof payload.account === 'Object' && payload.account.tier) ?  true : false
    payload.isAdmin = (payload.account.role === 'admin') ?  true : false
    commit('setAccount', {
      loggedIn: false,
      isPatron: false,
      isAdmin: false,
      account: {},
      models: {},
      drafts: {}
    })
  },
  initializeDraft( { commit, state }, payload) {
    const config = {
      type: payload.type,
      pattern: payload.pattern,
      model: payload.model,
      draftOptions: {},
      patternOptions: {}
    }
    if(payload.type === 'draftFromModel') {
      for (let optionName in FsConf.patterns[payload.pattern].options) {
        let option = FsConf.patterns[payload.pattern].options[optionName]
        if(option.type === 'measure') {
          if(state.user.account.units === 'imperial') {
            // Store in inch
            config.patternOptions[option.name] = option.default/25.4
          } else {
            // Store in cm
            config.patternOptions[optionName] = option.default/10
          }
        } else {
          config.patternOptions[optionName] = option.default
        }
      }
    }
    if(typeof payload.pattern.seamAllowance !== 'undefined') {
      config.draftOptions.sa = {
        type: 'pattern'+state.user.account.units,
        value: payload.pattern.seamAllowance[state.user.account.units]
      }
    } else {
      config.draftOptions.sa = {
        type: state.user.account.units,
        value: (state.user.account.units === 'imperial') ? 0.625 : 1
      }
    }
    config.draftOptions.scope = {
      type: 'pattern',
      included: []
    }
    config.draftOptions.theme = 'Basic'
    commit('setDraftInitial', {
      config: config,
      defaults: JSON.parse(JSON.stringify(config)),
      custom: {}
    })
  },
  updateDraftCustomOptionsCount( { commit, state } ) {
    let custom = {}
    for (var group in FsConf.patterns[state.draft.config.pattern].optiongroups) {
      custom[group] = 0
        for (let index in FsConf.patterns[state.draft.config.pattern].optiongroups[group]) {
          let option = FsConf.patterns[state.draft.config.pattern].optiongroups[group][index]
            if(state.draft.config.patternOptions[option] != state.draft.defaults.patternOptions[option]) {
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

