const fs = require('fs');
const axios = require('axios');

const base = 'xx'

const locales = {
  enabled: ['en', 'nl'],
  disabled: ['de', 'es', 'fr', 'no']
}
const allLocales = locales.enabled.concat(locales.disabled)

  const types = ['blog', 'showcase', 'docs']

const coordinators = {
  en: 'joost',
  nl: 'AnnekeCaramin',
  de: '_vacant',
  es: '_vacant',
  fr: '_vacant',
  no: '_vacant',
}


const files = ['measurements', 'options', 'patterns', 'site']

const baseStringCount = countTodo(base)
const promises = []
const api = 'http://localhost:3000/content-api/'
const status = {}
const p = new Promise(function(resolve, reject) {
  for(l in allLocales) {
    let loc = allLocales[l]
    status[loc] = {}
    status[loc].strings = baseStringCount - countTodo(loc)
    for(t in types) {
    let type = types[t]
      promises.push(
        axios.get(api+loc+'/'+type)
        .then((res) => {
          if(typeof res.data === 'object') status[loc][type] = res.data.length
          else status[loc][type] = 0
        })
        .catch((error) => {
          console.log(error)
        })
      )
    }
  }
  Promise.all(promises)
  .then(() => {
    console.log('Count completed, saving results')
    let yaml = 'enabled:'
    for(l in locales.enabled) {
      yaml += "\n  - "+locales.enabled[l]
    }
    yaml += "\ndisabled:"
    for(l in locales.disabled) {
      yaml += "\n  - "+locales.disabled[l]
    }
    yaml += "\nstatus:"
    yaml += "\n  target:"
    yaml += "\n    strings: "+status.en.strings
    yaml += "\n    blog: "+status.en.blog
    yaml += "\n    showcase: "+status.en.showcase
    yaml += "\n    docs: "+status.en.docs
    yaml += "\n  locales:"
    for(l in allLocales) {
      let loc = allLocales[l]
      yaml += "\n    "+loc+':'
      yaml += "\n      strings: "+status[loc].strings
      yaml += "\n      blog: "+status[loc].blog
      yaml += "\n      showcase: "+status[loc].showcase
      yaml += "\n      docs: "+status[loc].docs
      yaml += "\n      coordinator: '"+ coordinators[loc]+"'"
    }
    fs.writeFileSync('./nuxt/assets/config/i18n.yaml', yaml, 'utf8')
  })
  .catch(() => { reject(false) })
})


function countTodo(locale) {
  let total = 0
  let todo = 0
  for(f in files) {
    let array = fs.readFileSync('./nuxt/locales/'+locale+'/'+files[f]+'.yaml').toString().split("\n");
    for(i in array) {
      if(array[i].indexOf('TODO') !== -1) {
        todo++
      }
        total++
    }
  }
  return todo
}

function countContent(locale, type) {
  return new Promise(function(resolve, reject) {
    axios.get('http://localhost:3000/content-api/'+locale+'/'+type)
    .then((res) => {
      resolve(res.data.length)
    })
    .catch((error) => {
      reject(0)
    })
  })
}


