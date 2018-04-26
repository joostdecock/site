import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import FreesewingData from '~/static/json/freesewing.json'

export default ({ app, store, router }, inject) => {
  
  const pathMethod = function(path) {
    if(app.i18n.locale == app.i18n.fallbackLocale) return path
    else return '/'+app.i18n.locale+path
  }

 inject('fs', new Vue({
    data: () => ({
      api: {
        data: axios.create({
          baseURL: process.env.conf.api.data,
          timeout: 4500
        }),
        content: axios.create({
          baseURL: 'http://localhost:3000/content-api',
          timeout: 4500
        })
      },
      md: new MarkdownIt(),
      conf: FreesewingData
    }),
    methods: {
      path(path) {
        if(app.i18n.locale == app.i18n.fallbackLocale) return path
        else return '/'+app.i18n.locale+path
      },
      user(user) {
        return pathMethod('/users/'+user)
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
      content(section, path, isDev) {
        let l = app.i18n.locale
        let url = section+path
        var data = {}
        if(isDev) {
          axios.get('http://localhost:3000/content-api/'+url)
          .then(function (res) {
            console.log(res.data)
            data = res.data
          })
          .catch(function (error) {
             console.log('FAILED')
             console.log(error)
          })
        }
        console.log(data.title)
        return data
      }
    }
  }))
}
