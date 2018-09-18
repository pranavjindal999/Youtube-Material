import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import config from "@/config";
import { Language } from "@/translations";
import { asyncRegionCode } from "@/services/geolocation";

Vue.use(Vuex);

export const globalMutations = {
  updateLang: "updateLang",
  updateDrawer: "updateDrawer",
  toggleDrawer: "toggleDrawer",
  updateMaxResults: "updateMaxResults"
};

const vuexPersist = new VuexPersistence({
  key: "ytmat",
  strictMode: config.local
});

const $store = new Vuex.Store<AppState>({
  plugins: [vuexPersist.plugin],
  strict: config.local,
  state: {
    currentLang: config.defaultLanguage,
    regionCode: asyncRegionCode,
    drawer: true,
    maxResults: 18
  },
  getters: {},
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    [globalMutations.updateLang](state, lang: Language) {
      state.currentLang = lang;
    },
    [globalMutations.updateDrawer](state, drawer: boolean) {
      state.drawer = drawer;
    },
    [globalMutations.toggleDrawer](state) {
      state.drawer = !state.drawer;
    },
    [globalMutations.updateMaxResults](state, maxResults: number) {
      state.maxResults = maxResults;
    }
  }
});

interface AppState {
  currentLang: Language;
  regionCode: Promise<string>;
  drawer: boolean;
  maxResults: number;
}

export { $store };
