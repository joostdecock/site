import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import { format, differenceInCalendarDays, differenceInMonths } from 'date-fns'
import FreesewingData from '~/static/json/freesewing.json'
import Storage from './storage'

export default ({ app, store, router }, inject) => {

  const storage = new Storage()

  const ax = {
    data: axios.create({
      baseURL: process.env.conf.api.data,
      timeout: 15000
    })
  }

  const formatUnitsMethod = (value, units, type) => {
    if(type === 'measure') {
      if(units === 'imperial') {
        return 'fixme'
      } else {
        return Math.round(value*10)/10+'cm'
      }
    } else if (type === 'angle') {
      return Math.round(value*10)/10+'°'
    } else if (type === 'percent') {
      return Math.round(value*10)/10+'%'
    } else {
      return value
    }
  }

  const authRefreshMethod = () => {
    return ax.data.get('/account', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
    .then((res) => {
      if(typeof res.data === 'object') {
        store.dispatch('initializeAccount', res.data)
        return
      }
    })
    .catch((error) => {
      return(error)
    })
  }

  const normalize = (object) => {
    return JSON.parse(JSON.stringify(object))
  }

  inject('fs', new Vue({
    data: () => ({
      md: new MarkdownIt(),
      conf: FreesewingData
    }),
    methods: {

      login(data) {
        return ax.data.post('/login', data)
        .then((res) => {
          return(res.data)
        })
        .catch((error) => {
          return(error.response.data)
        })
      },

      logout() {
        storage.set('token')
        store.dispatch('resetAccount')
      },

      setToken(token) {
        return storage.set('token', token)
      },

      getToken() {
        return storage.get('token')
      },

      auth() {
        return ax.data.get('/account', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
          .then((res) => {
            return(res)
          })
        .catch((error) => {
          return(error)
        })
      },

      authRefresh() {
        authRefreshMethod()
      },

      draft() {
        return ax.data.post('/draft', normalize(store.state.draft.config), { headers: {'Authorization': 'Bearer '+storage.get('token')} })
          .then((res) => {
            return(res.data)
          })
        .catch((error) => {
          return({ result: 'error'})
        })
      },

      loadDraft(handle) {
        return ax.data.get('/draft/'+handle, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
          .then((res) => {
            return(res)
          })
        .catch((error) => {
          return(error)
        })
      },

      updateDraft(handle, data) {
        return ax.data.put('/draft/'+handle, data, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
          .then((res) => {
            return(res)
          })
        .catch((error) => {
          return(error)
        })
      },

      deleteDraft(handle) {
        return ax.data.delete('/draft/'+handle, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
        .then((res) => {
          return res
        })
        .catch((error) => {
          return(error)
        })
      },

      bulkDeleteDrafts() {
        const promises = []
        for( let index in store.state.selected.drafts) {
          let handle = store.state.selected.drafts[index].handle
          promises.push(ax.data.delete('/draft/'+handle, { headers: {'Authorization': 'Bearer '+storage.get('token')} }))
        }
        Promise.all(promises)
        .then(() => {
          authRefreshMethod()
          return true
        })
        .catch(() => { return false })
      },

      draftSvgLink(draftHandle, userHandle, cachingToken) {
        return FreesewingData.api.data+'/static/users/'+userHandle.substr(0,1)+'/'+
          userHandle+'/drafts/'+draftHandle+'/'+draftHandle+'.svg?cache='+cachingToken
      },

      draftComparedLink(draftHandle, userHandle, cachingToken) {
        return FreesewingData.api.data+'/static/users/'+userHandle.substr(0,1)+'/'+
          userHandle+'/drafts/'+draftHandle+'/'+draftHandle+'.compared.svg?cache='+cachingToken
      },

      draftDownloadLink(draftHandle, format) {
        return FreesewingData.api.data+'/download/'+draftHandle+'/'+format
      },

      patternHandle(name) {
        if(typeof FreesewingData.mapping.patternToHandle[name] === 'string') {
          return FreesewingData.mapping.patternToHandle[name]
        } else if (typeof FreesewingData.mapping.handleToPattern[name.toLowerCase()] === 'string') {
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
        return FreesewingData.api.data+path
      },
      modelIsValid(model, patternHandle) {
        var valid = true
          Object.entries(FreesewingData.patterns[patternHandle].measurements).forEach(
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
        return formatUnitsMethod(value, units, type)
      },

      formatPatternOption: (value, option, pattern, units) => {
        if(FreesewingData.patterns[pattern].options[option].type === 'chooseOne') {
           return FreesewingData.patterns[pattern].options[option].options[value]
        } else {
          return formatUnitsMethod(value, units, FreesewingData.patterns[pattern].options[option].type)
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
      }
    }
  }))
}
