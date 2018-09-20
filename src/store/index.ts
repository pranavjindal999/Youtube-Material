import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import config from "@/config";
import { Language } from "@/translations";
import { asyncRegionCode } from "@/services/geolocation";

Vue.use(Vuex);

export const globalMutations = {
  updateLang: "updateLang",
  updateDrawer: "updateDrawer",
  toggleDrawer: "toggleDrawer",
  updateMaxResults: "updateMaxResults",
  updateRegionCode: "updateRegionCode"
};

const vuexPersistPlugin = createPersistedState({
  key: "ytmat"
});

const $store = new Vuex.Store<AppState>({
  plugins: [vuexPersistPlugin],
  strict: config.local,
  state: {
    currentLang: config.defaultLanguage,
    regionCode: "IN",
    drawer: true,
    maxResults: 18
  },
  getters: {},
  mutations: {
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
    },
    [globalMutations.updateRegionCode](state, regionCode: string) {
      state.regionCode = regionCode;
    }
  }
});

(async () => {
  $store.commit(globalMutations.updateRegionCode, await asyncRegionCode);
})();

interface AppState {
  currentLang: Language;
  regionCode: string;
  drawer: boolean;
  maxResults: number;
}

export { $store };
