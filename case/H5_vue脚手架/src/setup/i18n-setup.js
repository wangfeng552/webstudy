import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export function setup (locale='zh-cn',messages) {
  return new VueI18n({
    locale, // set locale
    fallbackLocale: locale,
    messages // set locale messages
  })
}


export const loadedLanguages = [] // our default language that is prelaoded 

export function loadLanguageAsync (lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */`@/lang/${lang}`).then(msgs => {
        document.querySelector('html').setAttribute('lang', lang)
        loadedLanguages.push(lang)
        return {
          lang,
          message: msgs.default,
          exsist:0
        }
      })
    }
  return Promise.resolve({ exsist:1})
}
export function listenUrlLangChange (langSupport,defaultLang) {
  return new Promise(r => {
    const langReg = /\/([^\/]+)\//
    const path = location.pathname
    if (langReg.test(path)) {
      const matched = path.match(langReg)[1]
      if (Object.keys(langSupport).some(ls => ls == matched)) {
        r( matched)
      }
    }  
    r(defaultLang)
  })
}