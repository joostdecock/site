export const state = () => ({
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  locale: 'en',
  localePrefix: '',
  menu: {
    left: false,
    right: false
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
  showMainMenu(state) {
    state.menu.left = true
  },
  hideMainMenu(state) {
    state.menu.left = false
  },
  toggleMenu(state, side) {
    state.menu[side] = !state.menu[side]
  }
}
