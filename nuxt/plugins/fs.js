import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import { format, differenceInCalendarDays, differenceInMonths } from 'date-fns'
import f from '~/static/json/freesewing.json'
import Storage from './storage'
import Utils from './utils'

export default ({ app, store, router }, inject) => {

  const storage = new Storage()
  const utils = new Utils()

  const ax = {
    data: axios.create({
      baseURL: process.env.conf.api.data,
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
        reject(res)
      })
    })
  }

  const setToken = (token) => {
    return storage.set('token', token)
  }

  const token = () => {
    return storage.get('token')
  }

  const sliderRoundMethod = (value, units) => {
    let scale = f.defaults.sliders.scale[units]
      if(units === 'imperial') {
        return utils.roundToFraction(value/scale)
      } else {
        return utils.round(value/scale)
      }
  }

  inject('fs', new Vue({
    data: () => ({
      md: new MarkdownIt(),
      conf: f
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
          .catch(() => { reject(error.response.data) })
        })
      },

      auth() {
        return authMethod()
      },

      draft() {
        return new Promise(function(resolve, reject) {
          ax.data.post('/draft', utils.normalize(store.state.draft.config), { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              authMethod()
                .then(() => { resolve(res.data) })
            })
          .catch(() => { reject(false) })
        })
      },

      loadDraft(handle) {
        return new Promise(function(resolve, reject) {
          ax.data.get('/draft/'+handle, { headers: {'Authorization': 'Bearer '+token()} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error.response.data) })
        })
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

      bulkUpdateDrafts() {
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

      // Sync methods

      sliderRound(value) {
        return sliderRoundMethod(value, store.state.user.account.units)
      },

      normalize(object) {
        return utils.normalize(object)
      },

      username() {
        return store.state.user.account.username
      },

      avatar() {
        return f.api.data+store.state.user.account.pictureSrc
      },

      modelAvatar(src) {
        return f.api.data+src
      },

      getToken() {
        return token()
      },

      logout() {
        setToken('')
          store.dispatch('ejectAccount')
      },

      draftSvgLink(draftHandle, userHandle, cachingToken) {
        return f.api.data+'/static/users/'+userHandle.substr(0,1)+'/'+
          userHandle+'/drafts/'+draftHandle+'/'+draftHandle+'.svg?cache='+cachingToken
      },

      draftComparedLink(draftHandle, userHandle, cachingToken) {
        return f.api.data+'/static/users/'+userHandle.substr(0,1)+'/'+
          userHandle+'/drafts/'+draftHandle+'/'+draftHandle+'.compared.svg?cache='+cachingToken
      },

      draftDownloadLink(draftHandle, format) {
        return f.api.data+'/download/'+draftHandle+'/'+format
      },

      patternHandle(name) {
        if(typeof f.mapping.patternToHandle[name] === 'string') {
          return f.mapping.patternToHandle[name]
        } else if (typeof f.mapping.handleToPattern[name.toLowerCase()] === 'string') {
          return name.toLowerCase()
        } else {
          return false
        }
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
        return f.api.data+path
      },
      modelIsValid(model, patternHandle) {
        var valid = true
          Object.entries(f.patterns[patternHandle].measurements).forEach(
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
          return input[0].toUpperCase() + input.slice(1)
      },

      formatUnits: (value, units, type) => {
        return utils.format(value, units, type)
      },

      formatPatternOption: (value, option, pattern, units) => {
        if(f.patterns[pattern].options[option].type === 'chooseOne') {
          return f.patterns[pattern].options[option].options[value]
        } else {
          return utils.format(value, units, f.patterns[pattern].options[option].type)
        }
      },

      formatVersion(input) {
        return "<v-btn>input</v-btn>"
      },

      daysAgo(input) {
        let now = new Date()
          let days = differenceInCalendarDays(now, input)
          if (days === 0) {
            return app.i18n.t('today')
          } else if (days === 1) {
            return app.i18n.t('yesterday')
          } else if (days < 30) {
            return app.i18n.t('daysAgo', {days: days})
          } else {
            return app.i18n.t('monthsAgo', {months: differenceInMonths(now, input)})
          }
      },

      initializeDraft(payload) {
        const config = {
          type: payload.type,
          pattern: payload.pattern,
          model: payload.model,
          draftOptions: {},
          patternOptions: {}
        }
        let units = store.state.user.account.units
        let option = {}
        if(payload.type === 'draftFromModel') {
          for (let optionName in f.patterns[payload.pattern].options) {
            option = f.patterns[payload.pattern].options[optionName]
            if(option.type === 'measure') {
              config.patternOptions[optionName] = utils.sliderRound(option.default, units)
            } else {
              config.patternOptions[optionName] = utils.round(option.default)
            }
          }
        }
        if(typeof payload.pattern.seamAllowance !== 'undefined') {
          config.draftOptions.sa = {
            type: 'pattern'+units,
            value: payload.pattern.seamAllowance[units]
          }
        } else {
          config.draftOptions.sa = {
            type: units,
            value: (units === 'imperial') ? 0.625 : 1
          }
        }
        config.draftOptions.scope = {
          type: 'pattern',
          included: []
        }
        config.draftOptions.theme = 'Basic'
        store.commit('setDraftInitial', {
          config: config,
          defaults: JSON.parse(JSON.stringify(config)),
          custom: {}
        })
      },

      updateDraftCustomOptionsCount() {
        let custom = {}
        let units = store.state.user.account.units
          for (let group in f.patterns[store.state.draft.config.pattern].optiongroups) {
            custom[group] = 0
            for (let index in f.patterns[store.state.draft.config.pattern].optiongroups[group]) {
              let option = f.patterns[store.state.draft.config.pattern].optiongroups[group][index]
              if(store.state.draft.config.patternOptions[option] != store.state.draft.defaults.patternOptions[option]) {
                custom[group]++
              }
            }
          }
        store.commit('setDraftCustomOptionsCount', custom)
      },
    }

  }))
}
