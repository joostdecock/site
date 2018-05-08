yaml = require('js-yaml');
fs   = require('fs');

const strings ={}
const chapters = [
  'measurements',
  'options',
  'patterns',
  'site',
  'i18n',
]
const locales =  yaml.safeLoad(fs.readFileSync('./nuxt/assets/config/i18n.yaml', 'utf8'));
const allLocales = locales.enabled.concat(locales.disabled)
  allLocales.push('xx')
const base = {}
const baseAsArray = {}

const flatFiles = {measurements: '', site: '', i18n: ''}

for(f in chapters) {
    f = chapters[f]
    base[f] = yaml.safeLoad(fs.readFileSync('./nuxt/locales/en/'+f+'.yaml', 'utf8'));
    fs.writeFileSync('./nuxt/locales/en/'+f+'.yaml', yaml.safeDump(base[f], {sortKeys: true, lineWidth: 10000}), 'utf8')
    baseAsArray[f] = fs.readFileSync('./nuxt/locales/en/'+f+'.yaml').toString().split("\n");
}

for(l in allLocales) {
  let locale = allLocales[l]
  if(locale !== 'en') {
    // measurements, site, and i18n
    for(f in flatFiles) {
      content = yaml.safeLoad(fs.readFileSync('./nuxt/locales/'+locale+'/'+f+'.yaml', 'utf8'));
      for(line in base[f]) {
        if(typeof content[line] === 'undefined') {
          content[line] = base[f][line]+' TODO'
        }
        if(content[line] === base[f][line]) {
          content[line] = base[f][line]+' TODO'
        }
      }
      for(line in content) {
        if(typeof base[f][line] === 'undefined') {
          console.log('Not found in English language file: '+line)
        }
      }
      fs.writeFileSync('./nuxt/locales/'+locale+'/'+f+'.yaml', yaml.safeDump(content, {sortKeys: true, lineWidth: 10000}), 'utf8')
    }
    // Patterns
    content = yaml.safeLoad(fs.readFileSync('./nuxt/locales/'+locale+'/patterns.yaml', 'utf8'));
    for(pattern in base.patterns) {
      if(typeof content[pattern] === 'undefined') {
        content[pattern] = base.patterns[pattern]
      }
      if(typeof content[pattern].title === 'undefined') {
        content[pattern].title = base.patterns[pattern].title
      }
      if(typeof content[pattern].description === 'undefined') {
        content[pattern].description = base.patterns[pattern].description
      }
      if(content[pattern].title === base.patterns[pattern].title) {
        content[pattern].title = base.patterns[pattern].title+' TODO'
      }
      if(content[pattern].description === base.patterns[pattern].description) {
        content[pattern].description = base.patterns[pattern].description+' TODO'
      }
    }
    fs.writeFileSync('./nuxt/locales/'+locale+'/patterns.yaml', yaml.safeDump(content, {sortKeys: true, lineWidth: 10000}), 'utf8')
    // Pattern options
    content = yaml.safeLoad(fs.readFileSync('./nuxt/locales/'+locale+'/options.yaml', 'utf8'));
    for(option in base.options) {
      if(typeof content[option] === 'undefined') {
        content[option] = base.options[option]
      }
      if(typeof content[option].title === 'undefined') {
        content[option].title = base.options[option].title
      }
      if(typeof content[option].description === 'undefined') {
        content[option].description = base.options[option].description
      }
      if(typeof(base.options[option].description) === 'string') {
        if(content[option].description === base.options[option].description) {
          content[option].description = base.options[option].description+' TODO'
        }
      } else if(typeof(base.options[option].description) === 'object') {
        for(pcase in base.options[option].description) {
          if(content[option].description[pcase] === base.options[option].description[pcase]) {
            content[option].description[pcase] = base.options[option].description[pcase]+' TODO'
          }
        }
      }
    }
    fs.writeFileSync('./nuxt/locales/'+locale+'/options.yaml', yaml.safeDump(content, {sortKeys: true, lineWidth: 10000}), 'utf8')
  }
}


const json = {}

for(l in locales.enabled) {
  let locale = locales.enabled[l]
  console.log('Bundling language files for '+locale)
  strings[locale] = {}
  for(c in chapters) {
    let chapter = chapters[c]
    strings[locale][chapter] = yaml.safeLoad(fs.readFileSync('./nuxt/locales/'+locale+'/'+chapter+'.yaml', 'utf8'));
    for(i in strings[locale][chapter]) {
      if(typeof(strings[locale][chapter][i]) === 'string') {
        if(strings[locale][chapter][i].indexOf('DONE') !== -1) {
          strings[locale][chapter][i] = strings[locale][chapter][i].replace('DONE', '')
        }
        if(strings[locale][chapter][i].indexOf('TODO') !== -1) {
          strings[locale][chapter][i] = strings[locale][chapter][i].replace('TODO', '')
        }
      }
    }
  }
  // site, measurements, and i18n at top level
  json[locale] = { ...strings[locale].site, ...strings[locale].measurements, ...strings[locale].i18n }
  // patterns and options go in their own level
  json[locale]._patterns = strings[locale].patterns
  json[locale]._patternOptions = strings[locale].options
  console.log('Writing language bundle for '+locale)
  fs.writeFileSync('./nuxt/locales/'+locale+'/'+locale+'.json', JSON.stringify(json[locale], null, 0), 'utf8')
}
