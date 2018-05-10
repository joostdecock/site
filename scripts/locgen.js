const yaml = require('js-yaml');
const axios = require('axios');
const fs   = require('fs');

// Load config file
const config =  yaml.safeLoad(fs.readFileSync('./nuxt/assets/config/freesewing.yaml', 'utf8'));

// Concat both enabled and disabled locales, and add template locale
const allLocales = config.i18n.locales.enabled.concat(config.i18n.locales.disabled)
allLocales.push(config.i18n.template)

// Initialize vars
const stats = {}
const translations = {}
const promises = []

/* Loads language YAML files into object */
function loadLanguageTranslationFiles(locale) {
  const language = {}
  for(f in config.i18n.files) {
    file = config.i18n.files[f]
      if(typeof file === 'string') {
        language[file] = loadTranslationFile(locale, file)
      } else if (typeof file === 'object') {
        for (i in file) {
          for (j in file[i]) {
            language[file[i][j]] = loadTranslationFile(locale, file[i][j])
          }
        }
      } else {
        console.log('Could not load file of type ', typeof file)
      }
  }
  return language
}

/* Counts todo items in a translation object */
function countTranslationTodos(translation) {
  let todos = 0
    for(i in translation) {
      todos += countEntryTodos(translation[i])
    }
  return todos
}

/* Counts todo items in an entry, recursive if needed */
function countEntryTodos(translation) {
  let todos = 0
    if(typeof translation === 'string') {
      if(translation.indexOf('TODO') != -1) {
        todos++
      }
    } else if(typeof translation === 'object') {
      for(i in translation) {
        todos += countEntryTodos(translation[i])
      }
    }
  return todos
}

/* Makes sure all strings from origin language are present in translation object */
function padTranslation(translation, original) {
  for(i in original) {
    translation[i] = padEntry(translation[i], original[i])
  }
  for(i in translation) {
    if(typeof original[i] === 'undefined') {
      delete translation[i]
    }
  }
  return translation
}

/* Adds entry from origin language to translation object, recursive if needed */
function padEntry(translation, original) {
  if(typeof original === 'string') {
    if(typeof translation === 'undefined' || translation === original) {
      translation = original+' TODO'
    }
  }
  else if(typeof original === 'object') {
    for(i in original) {
      translation[i] = padEntry(translation[i], original[i])
    }
  }
  return translation
}

/* Gets rid of TODO and DONE in (the strings of a) translation object */
function scrubTranslation(translation) {
  for(i in translation) {
    translation[i] = scrubEntry(translation[i])
  }
  return translation
}

/* Gets rid of TODO and DONE in a translation entry, recursive if needed */
function scrubEntry(translation) {
  if(typeof translation === 'string') {
    if(translation.indexOf('DONE') !== -1) {
      translation = translation.replace('DONE', '').trim()
    }
    if(translation.indexOf('TODO') !== -1) {
      translation = translation.replace('DONE', '').trim()
    }
  } else if(typeof translation === 'object') {
    for(i in translation) {
      translation[i] = scrubEntry(translation[i])
    }
  }
  return translation
}

/* Loads a YAML translation file from disk */
function loadTranslationFile(locale, file) {
  return yaml.safeLoad(fs.readFileSync('./nuxt/locales/'+locale+'/'+file+'.yaml', 'utf8'));
}

/* Bundles a translation into JSON file and writes it to disk */
function writeJsonFile(locale, translation) {
  let json = {
    ...translation.app,
    ...translation.i18n,
    ...translation.measurements
  }
  json._patterns = translation.patterns
  json._options = translation.options
  fs.writeFileSync('./nuxt/locales/'+locale+'/'+locale+'.json', JSON.stringify(json, null, 0), 'utf8')
}

function countContentTypes(locale) {
  const api = 'http://localhost:3000/content-api/'
  const promises = []
  return new Promise(function(resolve, reject) {
    for(i in config.content) {
      let contentType = config.content[i]
      let url = api+locale+'/'+contentType
      stats[locale][contentType] = 0
      promises.push(
        axios.get(url)
        .then((res) => {
          if(typeof res.data === 'object') stats[locale][contentType] = res.data.length
        })
        .catch((error) => {
          console.log(error)
        })
      )
    }
    Promise.all(promises)
    .then(() => {
      resolve()
    })
    .catch((error) => { console.log(error); reject()})
  })
}


function setTarget(stats) {
  return {
    app: stats.xx.app,
    i18n: stats.xx.i18n,
    measurements: stats.xx.measurements,
    options: stats.xx.options,
    patterns: stats.xx.patterns,
    blog: stats.en.blog,
    docs: stats.en.docs,
    showcase: stats.en.showcase
  }
}

function formatStats(stats, locale) {
  for(i in config.i18n.target) {
    if(!config.content.includes(i)) {
      stats[i] = (config.i18n.target[i] - stats[i])
    }
  }
  return stats
}

// Let's get to work
new Promise(function(resolve, reject) {
  for(l in allLocales) {
    let locale = allLocales[l]
      // Load languages as they are
      translations[locale] = loadLanguageTranslationFiles(locale)
      if(locale !== 'en') {
        // Pad language files with new entries from origin files (English)
        for(file in translations.en) {
          translations[locale][file] = padTranslation(translations[locale][file], translations.en[file])
        }
      }
    // Count TODOs
    stats[locale] = {}
    for(file in translations.en) {
      stats[locale][file] = countTranslationTodos(translations[locale][file])
    }
    // Write updated YAML files to disk
    for(file in translations.en) {
      fs.writeFileSync('./nuxt/locales/'+locale+'/'+file+'.yaml', yaml.safeDump(translations[locale][file], {sortKeys: true, lineWidth: 10000}), 'utf8')
    }
    // Filter out DONE and TODO
    for(file in translations.en) {
      translations[locale][file] = scrubTranslation(translations[locale][file])
    }
    // Bundle language files and write JSON files to disk
    writeJsonFile(locale, translations[locale])
    // Add content to stats
    promises.push(
      countContentTypes(locale)
      .then((res) => {
        config.i18n.target = setTarget(stats)
      })
    )
  }
  Promise.all(promises)
  .then(() => {
    for(l in allLocales) {
      let locale = allLocales[l]
      config.i18n.stats[locale] = formatStats(stats[locale], locale)
    }
    fs.writeFileSync('./nuxt/assets/config/freesewing.yaml', yaml.safeDump(config, {sortKeys: true, lineWidth: 10000}), 'utf8')
    resolve()
  })
  .catch((error) => { console.log(error); reject()})
})



