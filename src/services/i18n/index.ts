import { Language } from "@/translations";
import Vue from "vue";
import VueI18n from "vue-i18n";
import { $store } from "@/store";
import config from "@/config";
import en from "@/translations/en";
import { merge } from "lodash";

Vue.use(VueI18n);

const i18nInstance = new VueI18n({
  fallbackLocale: config.defaultLanguage,
  messages: { en }
});

const loadedLanguages: Language[] = [config.defaultLanguage];
setLanguage($store.state.currentLang);

const i18n = merge(i18nInstance, { setLanguage });
export { i18n };

/**
 * Changes language of app dynamically fetching language file from translations folder
 *
 * @param {Language} lang language key (must be same as file name in translations folder)
 * @returns
 */
function setLanguage(lang: Language) {
  if (i18nInstance.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/translations/${lang}`).then(
        msgs => {
          i18nInstance.setLocaleMessage(lang, msgs.default);
          loadedLanguages.push(lang);
          return setLanguageInternal(lang);
        }
      );
    }
    return Promise.resolve(setLanguageInternal(lang));
  }
  return Promise.resolve(lang);
}

/**
 * Changes document's language and i18n instance language
 *
 * @param {Language} lang
 * @returns
 */
function setLanguageInternal(lang: string) {
  i18nInstance.locale = lang;
  document.documentElement.setAttribute("lang", lang);
  $store.commit("updateLang", lang);
  return lang;
}
