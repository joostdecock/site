import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import { format, differenceInCalendarDays, differenceInMonths, differenceInYears } from 'date-fns'
import Storage from './storage'
import Utils from './utils'
import Conf from './config'

export default ({ app, store, route }, inject) => {

  const storage = new Storage()
  const utils = new Utils()
  const md = new MarkdownIt()
  const ax = {
    data: axios.create({
      baseURL: Conf.apis.data,
      timeout: 15000
    })
  }

  const authMethod = () => {
    return new Promise(function(resolve, reject) {
      ax.data.get('/account', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
        .then((res) => {
          if(typeof res.data === 'object') {
            store.dispatch('injectAccount', res.data)
              resolve(true)
          }
        })
        .catch((res) => {
          store.dispatch('ejectAccount', {})
          console.log('Authentication failed | plugin')
          resolve(false)
        })
    })
  }

  const setToken = (token) => {
    return storage.set('token', token)
  }

  const saveAdminToken = () => {
    return storage.set('adminToken', storage.get('token'))
  }

  const restoreAdminToken = () => {
    return storage.set('token', storage.get('adminToken'))
  }

  const token = () => {
    return storage.get('token')
  }

  const patternHandleMethod = (name) => {
    if(typeof Conf.mapping.patternToHandle[name] === 'string') {
      return Conf.mapping.patternToHandle[name]
    } else if (typeof Conf.mapping.handleToPattern[name.toLowerCase()] === 'string') {
      return name.toLowerCase()
    } else {
      return false
    }
  }

  const patternClassMethod = (name) => {
    let pattern = patternHandleMethod(name)
    return Conf.mapping.handleToPattern[pattern]
  }

  const modelMeasurementsMethod = (model, pattern) => {
    let measurements = {}
    for(let m in Conf.patterns[pattern].measurements) {
      measurements[m] = model.data.measurements[m]
    }
    return measurements
  }

  const loadDraftMethod = (handle) => {
    return new Promise(function(resolve, reject) {
    ax.data.get('/draft/'+handle, { headers: {'Authorization': 'Bearer '+token()} })
      .then((res) => {
        resolve(res.data)
      })
    .catch((error) => { reject(error.response.data) })
    })
  }

  const loadUserMethod = (username) => {
    return new Promise(function(resolve, reject) {
    ax.data.get('/profile/'+username, { headers: {'Authorization': 'Bearer '+token()} })
      .then((res) => {
        resolve(res.data)
      })
    .catch((error) => { reject(error.response.data) })
    })
  }

  const adminLoadUserMethod = (username) => {
    return new Promise(function(resolve, reject) {
    ax.data.get('/admin/user/'+username, { headers: {'Authorization': 'Bearer '+token()} })
      .then((res) => {
        resolve(res.data)
      })
    .catch((error) => { reject(error.response.data) })
    })
  }

  const asGist = (type, data) => {
    const gist = {
      type: type,
      units: data.units,
      draftOptions:  {},
      patternOptions: {}
    }
    if(type === 'forkFromModel' || type === 'redraftFromModel') {
      // Forked draft
      gist.pattern = patternHandleMethod(data.draft.pattern)
      gist.patternClass = patternClassMethod(data.draft.pattern)
      let sourceOptions = {}
      let units = ''
      let sa ={}
      sourceOptions = data.draft.data.gist.patternOptions
      units = data.draft.data.gist.units
      gist.draftOptions = data.draft.data.gist.draftOptions
      let ufactor = (units === 'metric') ? 10 : 25.4
      let option = {}
      for (let optionName in Conf.patterns[gist.pattern].options) {
        option = Conf.patterns[gist.pattern].options[optionName]
        if(option.type === 'measure') {
          gist.patternOptions[optionName] = utils.sliderRound(sourceOptions[optionName]*ufactor, gist.units)
        } else {
          gist.patternOptions[optionName] = utils.round(sourceOptions[optionName])
        }
      }
    } else if(type === 'draftFromModel') {
      // New draft
      gist.pattern = patternHandleMethod(data.pattern)
      gist.patternClass = patternClassMethod(data.pattern)
      let option = {}
      for (let optionName in Conf.patterns[gist.pattern].options) {
        option = Conf.patterns[gist.pattern].options[optionName]
        if(option.type === 'measure') {
          gist.patternOptions[optionName] = utils.sliderRound(option.default, gist.units)
        } else {
          gist.patternOptions[optionName] = utils.round(option.default)
        }
      }
      if(typeof Conf.patterns[gist.pattern].seamAllowance !== 'undefined') {
        gist.draftOptions.sa = {
          type: 'pattern'+gist.units,
          value: Conf.patterns[gist.pattern].seamAllowance[gist.units]
        }
      } else {
        gist.draftOptions.sa = {
          type: gist.units,
          value: Conf.defaults.sa[gist.units]
        }
      }
      gist.draftOptions.scope = {
        type: 'pattern',
        included: []
      }
      gist.draftOptions.theme = 'Basic'
      gist.draftOptions.locale = app.i18n.locale
    }
    gist.model = {
      units: data.model.units,
      handle: data.model.handle,
      name: data.model.name,
      measurements: modelMeasurementsMethod(data.model, gist.pattern)
    }
    return gist
  }

  const pathLocaleMethod = (path) => {
    for(let i in Conf.i18n.locales.enabled) {
      let loc = Conf.i18n.locales.enabled[i]
      if ('/'+loc+'/' === path.substr(0,4)) return loc
    }
    return 'en'
  }

  // From https://gist.github.com/CatTail/4174511
  const decodeHtmlEntity = function(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }

  inject('fs', new Vue({
    data: () => ({
      md: md,
      conf: Conf,
      content: app.$content
    }),
    methods: {
      // Async methods (thenable)
      login(data) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/login', data)
            .then((res) => {
              setToken(res.data.token)
                resolve(res.data)
            })
          .catch((error) => { reject(error.response.data) })
        })
      },

      loginAs(username) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/login/as', {user: username}, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              saveAdminToken()
              setToken(res.data.token)
              store.dispatch('loggedInAs', username)
              resolve(res.data)
            })
          .catch((error) => { reject(error.response.data) })
        })
      },

      recoverPassword(data) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/recover', data)
            .then((res) => {
              resolve(res.data)
            })
          .catch(() => { reject(error.response.data) })
        })
      },

      resetPassword(data) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/reset/'+data.hash, {password: data.password})
            .then((res) => {
              setToken(res.data.token)
              resolve(res.data)
            })
          .catch((error) => { reject(error.response.data) })
        })
      },

      signup(data) {
          return new Promise(function(resolve, reject) {
            ax.data.post('/signup', data)
              .then((res) => {
                setToken(res.data.token)
                  resolve(res.data)
              })
              .catch((error) => { console.log(error); reject(error) })
          })
      },

      confirmEmail(hash) {
          return new Promise(function(resolve, reject) {
            ax.data.get('/confirm/'+hash)
              .then((res) => {
                resolve(res.data)
              })
              .catch((error) => { console.log(error); reject(error) })
          })
      },

      deletePendingAccount(hash) {
          return new Promise(function(resolve, reject) {
            ax.data.delete('/confirm/'+hash)
              .then((res) => {
                resolve(res.data)
              })
              .catch((error) => { console.log(error); reject(error) })
          })
      },

      createPendingAccount(data) {
          return new Promise(function(resolve, reject) {
            ax.data.post('/newuser', data)
              .then((res) => {
                setToken(res.data.token)
                resolve(res.data)
              })
              .catch((error) => { console.log(error); reject(error) })
          })
      },

      auth() {
        return authMethod()
      },

      draft(mode) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/draft', utils.normalize(store.state.draft.gist), { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              authMethod()
                .then(() => { resolve(res.data) })
            })
          .catch(() => { reject(false) })
        })
      },

      loadDraft(handle) {
        return loadDraftMethod(handle)
      },

      loadUser(username) {
        return loadUserMethod(username)
      },

      adminLoadUser(username) {
        return adminLoadUserMethod(username)
      },

      updateDraft(handle, data) {
        return new Promise(function(resolve, reject) {
          ax.data.put('/draft/'+handle, data, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              let data = res.data
                authMethod()
                .then((res) => {
                  resolve(data)
                })
            })
          .catch((error) => { reject(error) })
        })
      },

      deleteDraft(handle) {
        return new Promise(function(resolve, reject) {
          ax.data.delete('/draft/'+handle, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              authMethod()
                .then((res) => { resolve(true) })
            })
          .catch((error) => { reject(false) })
        })
      },

      bulkDeleteDrafts() {
        return new Promise(function(resolve, reject) {
          const promises = []
            for( let index in store.state.selected.drafts) {
              let handle = store.state.selected.drafts[index].handle
                promises.push(
                    ax.data.delete(
                      '/draft/'+handle,
                      { headers: {'Authorization': 'Bearer '+storage.get('token')} }
                      )
                    )
            }
          Promise.all(promises)
            .then(() => {
              authMethod()
                resolve(true)
            })
          .catch(() => { reject(false) })
        })
      },

      bulkUpgradeDrafts() {
        return new Promise(function(resolve, reject) {
          const promises = []
            for( let index in store.state.selected.drafts) {
              let handle = store.state.selected.drafts[index].handle
                promises.push(
                    ax.data.post(
                      '/draft/'+handle+'/upgrade',
                      {},
                      { headers: {'Authorization': 'Bearer '+storage.get('token')} }
                      )
                    )
            }
          Promise.all(promises)
            .then(() => {
              authMethod()
                resolve(true)
            })
          .catch(() => { reject(false) })
        })
      },

      upgradeDraft(handle) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/draft/'+handle+'/upgrade',{},{ headers: {'Authorization': 'Bearer '+storage.get('token')} })
          .then(() => {
            authMethod()
            resolve(true)
          })
          .catch(() => { reject(false) })
        })
      },

      loadModel(handle) {
        return new Promise(function(resolve, reject) {
          ax.data.get('/model/'+handle, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error.response.data) })
        })
      },

      bulkDeleteModels() {
        return new Promise(function(resolve, reject) {
          const promises = []
            for( let index in store.state.selected.models) {
              let handle = store.state.selected.models[index].handle
                promises.push(
                    ax.data.delete(
                      '/model/'+handle,
                      { headers: {'Authorization': 'Bearer '+storage.get('token')} }
                      )
                    )
            }
          Promise.all(promises)
            .then(() => {
              authMethod()
                resolve(true)
            })
          .catch(() => { reject(false) })
        })
      },

      updateAccount(data) {
        return new Promise(function(resolve, reject) {
          ax.data.put('/account', data, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              if(res.data.result === 'ok' && res.data.reason === 'no_changes_made') {
                resolve(res.data)
              } else if(res.data.result === 'ok') {
                let data = res.data
                  authMethod()
                  .then((res) => {
                    resolve(data)
                  })
              } else {
                reject(res.data)
              }
            })
          .catch((error) => { reject(error) })
        })
      },

      confirmEmailChange(hash) {
        return new Promise(function(resolve, reject) {
          ax.data.get('/confirm/email/'+hash, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              if(res.data.result === 'ok') {
                authMethod()
                  .then((res) => {
                    resolve(res.data)
                  })
              } else {
                reject(res.data)
              }
            })
          .catch((error) => { reject(error) })
        })
      },

      createModel(data) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/model', data, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => { resolve(res.data)})
            .catch((error) => { reject(error) })
        })
      },

      updateModel(handle, data) {
        return new Promise(function(resolve, reject) {
          ax.data.put('/model/'+handle, data, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              if(res.data.result === 'ok' && res.data.reason === 'no_changes_made') {
                resolve(res.data)
              } else if(res.data.result === 'ok') {
                let data = res.data
                  authMethod()
                  .then((res) => {
                    resolve(data)
                  })
              } else {
                reject(res.data)
              }
            })
          .catch((error) => { reject(error) })
        })
      },

      loadPatrons() {
          return new Promise(function(resolve, reject) {
              ax.data.get('/patrons/list', { headers: {'Authorization': 'Bearer '+token()} })
                  .then((res) => {
                      resolve(res.data.patrons)
                  })
                  .catch((error) => { reject(error.response.data) })
          })
      },

      loadPageComments(path) {
          return new Promise(function(resolve, reject) {
              ax.data.get('/comments/page'+path)
                  .then((res) => {
                      resolve(res.data.comments)
                  })
                  .catch((error) => { reject(error.response.data) })
          })
      },

      postComment(data) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/comment', data, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => { resolve(res.data)})
            .catch((error) => { reject(error) })
        })
      },

      deleteAccount() {
        return new Promise(function(resolve, reject) {
          ax.data.delete('/account', { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              setToken('')
              store.dispatch('ejectAccount')
              resolve(true)
            })
          .catch((error) => { reject(false) })
        })
      },

      freezeAccount() {
        return new Promise(function(resolve, reject) {
          ax.data.put('/account/freeze', {}, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              setToken('')
              store.dispatch('ejectAccount')
              resolve(true)
            })
          .catch((error) => { reject(false) })
        })
      },

      exportData() {
        return new Promise(function(resolve, reject) {
          ax.data.get('/export', { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              resolve(true)
            })
          .catch((error) => { reject(false) })
        })
      },

      get(url) {
        return new Promise(function(resolve, reject) {
          let conf = {
            timeout: 15000
          }
          if(url.indexOf('://') === -1) {
            conf.baseURL = process.env.FS_SITE
            conf.browserBaseURL = process.env.FS_SITE
          }
          const gurl = axios.create(conf)

          gurl.get(url)
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error.response.data) })
        })
      },

      adminFindUsers(input) {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/find/users/'+input, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(false) })
        })
      },

      adminRemoveBadge(badge, username) {
        return new Promise(function(resolve, reject) {
          ax.data.delete('/admin/user/'+username+'/badge/'+badge, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(false) })
        })
      },

      adminAddBadge(badge, username) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/user/'+username+'/badge/'+badge, {}, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(false) })
        })
      },

      logReferral(url) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/referral', {
              host: url.hostname,
              path: url.pathname,
              url: url.href
          })
            .then((res) => {
              resolve(res.data)
            })
            .catch((error) => { console.log(error); reject(error) })
        })
      },

      // Sync methods

      pathLocale(path) {
        return pathLocaleMethod(path)
      },

      // Translation pattern option title
      pot(option, pattern, locale) {
        return app.i18n.messages[locale]._options[option].title
      },

      // Translation pattern option description
      pod(option, pattern, locale) {
        let p = patternHandleMethod(pattern)
        let m = app.i18n.messages[locale]._options[option]
        if(typeof m.description === 'string') { return m.description }
        else if (typeof m.description[p] === 'string') { return m.description[p] }
        else { return m.description._default }
      },

      percent(val, target) {
        return Math.round(val/(target/100))
      },

      percentColor(percent) {
        if(percent>90) return "success"
        else if(percent>50) return "accent"
        else return "primary"
      },

      asMm(value, units) {
        return utils.asMm(value, units)
      },

      sliderRound(value, units) {
        return utils.sliderRound(value, units)
      },

      normalize(object) {
        return utils.normalize(object)
      },

      username() {
        return store.state.user.account.username
      },

      avatar() {
        return Conf.apis.data+store.state.user.account.pictureSrc
      },

      modelAvatar(src) {
        return Conf.apis.data+src
      },

      getToken() {
        return token()
      },

      logout() {
        setToken('')
        store.dispatch('ejectAccount')
      },

      logoutAs() {
        setToken('')
        restoreAdminToken()
        store.dispatch('loggedOutAs')
        authMethod()
      },

      draftSvgLink(draftHandle, userHandle, cachingToken) {
        return Conf.apis.data+'/static/users/'+userHandle.substr(0,1)+'/'+
          userHandle+'/drafts/'+draftHandle+'/'+draftHandle+'.svg?cache='+cachingToken
      },

      draftComparedLink(draftHandle, userHandle, cachingToken) {
        return Conf.apis.data+'/static/users/'+userHandle.substr(0,1)+'/'+
          userHandle+'/drafts/'+draftHandle+'/'+draftHandle+'.compared.svg?cache='+cachingToken
      },

      draftDownloadLink(draftHandle, format) {
        return Conf.apis.data+'/download/'+draftHandle+'/'+format
      },

      patternHandle(name) {
        return patternHandleMethod(name)
      },

      path(path) {
        if(app.i18n.locale == app.i18n.fallbackLocale) return path
        else return '/'+app.i18n.locale+path
      },
      userPath(user) {
        if(app.i18n.locale == app.i18n.fallbackLocale) return '/users/'+user
        else return '/'+app.i18n.locale+'/users/'+user
      },
      draftPath(handle) {
        if(app.i18n.locale == app.i18n.fallbackLocale) return '/drafts/'+handle
        else return '/'+app.i18n.locale+'/drafts/'+handle
      },
      dataPath(path) {
        return Conf.apis.data+path
      },
      modelIsValid(model, patternHandle) {
        if(typeof model.data.measurements === 'undefined') {
          return false
        }
        var valid = true
          Object.entries(Conf.patterns[patternHandle].measurements).forEach(
              ([key, value]) => {
                if(typeof model.data.measurements[key] === 'undefined') {
                  valid = false
                }
              }
              )
          return valid
      },
      ucfirst(input) {
        if (typeof input === 'undefined') return input
        if (input.length === 0) return input
          return input[0].toUpperCase() + input.slice(1)
      },

      formatUnits: (value, units, type) => {
        return utils.format(value, units, type)
      },

      formatPatternOption: (value, option, pattern, units) => {
        if(Conf.patterns[pattern].options[option].type === 'chooseOne') {
          return Conf.patterns[pattern].options[option].options[value]
        } else {
          return utils.format(value, units, Conf.patterns[pattern].options[option].type)
        }
      },

      formatVersion(input) {
        return "<v-btn>input</v-btn>"
      },

      parseImperial(value) {
        let inch = 0
        let fraction = ''
        //value = value.trim()
        if(value.indexOf('/') === -1) {
          return value
        }
        if(value.indexOf(' ') !== -1) {
          let chunks = value.split(' ')
          if(chunks.length !== 2) {
            return false
          }
          inch = chunks[0]
          fraction = chunks[1]
        } else {
          fraction = value
        }
        return parseInt(inch)+(utils.fractionToDecimal(fraction))
      },

      daysAgo(input) {
        let now = new Date()
          let days = differenceInCalendarDays(now, input)
          let months = differenceInMonths(now, input)
          let years = differenceInYears(now, input)
          if (days === 0) return app.i18n.t('today')
          if (days === 1) return app.i18n.t('yesterday')
          if (days < 30)  return app.i18n.t('daysAgo', {days: days})
          if (months < 12) return app.i18n.tc('monthsAgo', months, {months})
          else return app.i18n.tc('yearsAgo', years, {years})
      },

      initializeDraft(pattern, model) {
        const gist = asGist('draftFromModel', {
          pattern: pattern,
          model: store.state.user.models[model],
          units: store.state.user.account.units,
          locale: app.i18n.locale
        })
        store.commit('setDraftInitial', {
          gist: gist,
          defaults: JSON.parse(JSON.stringify(gist)),
          custom: {}
        })
      },

      initializeFork(draftHandle, model, mode) {
        let draft = {}
        if(typeof store.state.user.drafts[draftHandle] === 'undefined') {
          loadDraftMethod(draftHandle)
            .then((res) => {
              draft = res.data
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          draft = store.state.user.drafts[draftHandle]
        }
        const gist = asGist(mode+'FromModel', {
          draft: draft,
          model: store.state.user.models[model],
          units: store.state.user.account.units,
          locale: app.i18n.locale
        })
        if(mode === 'fork') {
          gist.draftOptions.fork = draftHandle
        }
        else if(mode === 'redraft') {
          gist.draftOptions.redraft = draftHandle
        }
        store.commit('setDraftInitial', {
          gist: gist,
          defaults: JSON.parse(JSON.stringify(gist)),
          custom: {}
        })
      },

      modelMeasurements(model, pattern) {
        return modelMeasurementsMethod(model, pattern)
      },

      updateDraftCustomOptionsCount() {
        if(typeof store.state.draft.gist.pattern === 'undefined' || store.state.draft.gist.pattern === '') {
          return false
        }
        let custom = {}
        let units = store.state.user.account.units
          for (let group in Conf.patterns[store.state.draft.gist.pattern].optiongroups) {
            custom[group] = 0
            for (let index in Conf.patterns[store.state.draft.gist.pattern].optiongroups[group]) {
              let option = Conf.patterns[store.state.draft.gist.pattern].optiongroups[group][index]
              if(store.state.draft.gist.patternOptions[option] != store.state.draft.defaults.patternOptions[option]) {
                custom[group]++
              }
            }
          }
        store.commit('setDraftCustomOptionsCount', custom)
      },
    }

  }))
}
