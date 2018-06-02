export default async function ({ app, store }) {
  if (!process.server) {
    if(document.referrer !== '') {
      const url = new URL(document.referrer)
      if(url.hostname != window.location.hostname) {
        app.$fs.logReferral(url)
      }
    }
  }
}
