import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import FreesewingData from '~/static/json/freesewing.json'
import Storage from './storage'

export default ({ app, store, router }, inject) => {

  const storage = new Storage()

  const ax = {
    data: axios.create({
      baseURL: process.env.conf.api.data,
      timeout: 4500,
      headers: {'Authorization': 'Bearer '+storage.get('token')}
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
        return ax.data.get('/account')
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
      units() {
        format: (value, units, type) => {
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
        }
      },
    }
  }))
}
