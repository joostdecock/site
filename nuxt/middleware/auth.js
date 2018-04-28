export default async function ({ app, store }) {
  if(!store.state.user.loggedIn) {
    if(app.$fs.getToken()) {
      let { data } = await app.$fs.auth()
      if(typeof data === 'object') {
        store.dispatch('initializeAccount', data)
      }
    }
  }
}
