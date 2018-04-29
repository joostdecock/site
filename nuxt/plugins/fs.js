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
      timeout: 4500
    })
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

      draft() {
        let data = store.state.draft.config
        data.pattern = store.state.draft.pattern
        data.model = store.state.draft.model.handle
        return ax.data.post('/draft', data, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
          .then((res) => {
            return(res)
          })
        .catch((error) => {
          return(error)
        })
      },

      path(path) {
        if(app.i18n.locale == app.i18n.fallbackLocale) return path
        else return '/'+app.i18n.locale+path
      },
      user(user) {
        if(app.i18n.locale == app.i18n.fallbackLocale) return '/users/'+user
        else return '/'+app.i18n.locale+'/users/'+user
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
