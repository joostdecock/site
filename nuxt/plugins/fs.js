import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import FreesewingData from '~/static/json/freesewing.json'

export default ({ app, store, router }) => {

    const pathMethod = function(path) {
      if(app.i18n.locale == app.i18n.fallbackLocale) return path
      else return '/'+app.i18n.locale+path
    }

    Vue.prototype.$fs = {
      // Returns a language-prefixed path for links
      path: (path) => {
        if(app.i18n.locale == app.i18n.fallbackLocale) return path
        else return '/'+app.i18n.locale+path
      },
    
      // Returns a language-prefixed link to a user profile
      user: (user) => {
        return pathMethod('/users/'+user)
      },

      // Checks wheter a model has all required measurements for a pattern
      modelIsValid: (model, patternHandle) => {
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

      // Axios instance to connect to the backend
      api: {
        data: axios.create({
          baseURL: process.env.conf.api.data,
          timeout: 4500
        })
      },

      // Markdown parser instance
      md: new MarkdownIt(),

      // Freesewnig config data
      conf: FreesewingData
    }
}
