export default async function ({ app, store }) {
  if(!store.state.user.loggedIn) {
    if(app.$fs.getToken()) {
      app.$fs.auth()
    }
  }
}
