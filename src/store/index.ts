import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import config from "@/config";
import { Language } from "@/translations";

Vue.use(Vuex);

export const globalMutations = {
  updateLang: "updateLang"
};

const vuexPersist = new VuexPersistence({
  key: "ytmat",
  strictMode: config.local
});

const $store = new Vuex.Store<AppState>({
  plugins: [vuexPersist.plugin],
  strict: config.local,
  state: {
    currentLang: config.defaultLanguage
  },
  getters: {},
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    [globalMutations.updateLang](state, lang: Language) {
      state.currentLang = lang;
    }
  }
});

interface AppState {
  currentLang: Language;
}

export { $store };
