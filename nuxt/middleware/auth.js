export default async function ({ app, store }) {
  if(!store.state.user.loggedIn) {
    if(app.$fs.getToken()) {
      app.$fs.auth()
      .then((res) => {console.log('account loaded')})
      .catch((res) => {
        console.log('could not load account')
        console.log(res)
      })
    } else {
      store.dispatch('ejectAccount', {})
    }

  }
}
