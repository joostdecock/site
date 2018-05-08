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

const json = {}

for(l in locales.enabled) {
  let locale = locales.enabled[l]
  console.log('Bundling language files for '+locale)
  strings[locale] = {}
  for(c in chapters) {
    let chapter = chapters[c]
    strings[locale][chapter] = yaml.safeLoad(fs.readFileSync('./nuxt/locales/'+locale+'/'+chapter+'.yaml', 'utf8'));
  }
  // site, measurements, and i18n at top level
  json[locale] = { ...strings[locale].site, ...strings[locale].measurements, ...strings[locale].i18n }
  // patterns and options go in their own level
  json[locale]._patterns = strings[locale].patterns
  json[locale]._patternOptions = strings[locale].options
  console.log('Writing language bundle for '+locale)
  fs.writeFileSync('./nuxt/locales/'+locale+'/'+locale+'.json', JSON.stringify(json[locale], null, 0), 'utf8')
}
