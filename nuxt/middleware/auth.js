export default async function ({ app, store }) {
  if(!store.state.user.loggedIn) {
    let { data } = await app.$fs.auth()
    store.dispatch('initializeAccount', data)
  }
}
