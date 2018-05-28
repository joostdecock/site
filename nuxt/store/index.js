export const state = () => ({
  user: {
    loggedIn: false,
    isPatron: false,
    isAdmin: false,
    isFresh: false,
    account: {
      consent: {
        profile: 0,
        model: 0,
        objectsToOpenData: 0
      }
    },
    models: {},
    drafts: {}
  },
  loggedInAs: {
    active: false,
    user: ''
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
    gist: {
      type: '',
      pattern: '',
      units: '',
      model: {},
      patternOptions: {},
      draftOptions: {
        sa: {},
        scope: {},
        theme: 'Basic',
        locale: 'en'
    },
    },
    custom: {
      draftOptions: {
        sa: {},
        scope: {},
        theme: 'Basic'
      },
      model: '',
      pattern: '',
      type: '',
      patternOptions: {}
    },
  },
  selected: {
    drafts: [],
    models: []
  },
  actions: {
    deleteDraft: false
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
    state.draft.gist.patternOptions[payload.name] = payload.value
  },
  setDraftSa(state, payload) {
    state.draft.gist.draftOptions.sa = {
      type: payload.type,
      value: payload.value
    }
  },
  setDraftScope(state, payload) {
    state.draft.gist.draftOptions.scope = {
      type: payload.type,
      included: {...payload.included}
    }
  },
  setDraftTheme(state, payload) {
    state.draft.gist.draftOptions.theme = payload
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
  setAction(state, payload) {
    state.actions[payload.action] = payload.value
  },
  setLoggedInAs(state, payload) {
    state.loggedInAs = payload
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
  },
  loggedInAs( { commit }, payload) {
    // Eject account
    commit('setAccount', {
      loggedIn: false,
      isPatron: false,
      isAdmin: false,
      isFresh: true,
      account: {},
      models: {},
      drafts: {}
    })
    commit('setLoggedInAs',{
      active: true,
      user: payload
    })
  },
  loggedOutAs( { commit }) {
    // Eject account
    commit('setAccount', {
      loggedIn: false,
      isPatron: false,
      isAdmin: false,
      isFresh: true,
      account: {},
      models: {},
      drafts: {}
    })
    commit('setLoggedInAs',{
      active: false,
      user: ''
    })
  }
}

