export const state = () => ({
  user: {
    loggedIn: false,
    isPatron: false,
    isAdmin: false,
    isFresh: false,
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
  setSelectedModels(state, payload) {
    state.selected.models = payload
  },
}

export const actions = {
  injectAccount( { commit }, payload) {
    payload.loggedIn = true
    payload.isFresh = true
    payload.isPatron = false
    if(typeof payload.account.patron === 'object' && payload.account.patron.tier > 0) {
      payload.isPatron = true
    }
    payload.isAdmin = (payload.account.role === 'admin') ?  true : false
    commit('setAccount', payload)
  },
  ejectAccount( { commit }) {
    commit('setAccount', {
      loggedIn: false,
      isPatron: false,
      isAdmin: false,
      isFresh: true,
      account: {},
      models: {},
      drafts: {}
    })
  },
  draftOptionUpdate( { commit, dispatch }, payload) {
    commit('setDraftOption', payload)
  }
}

