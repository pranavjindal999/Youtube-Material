import { GA } from "./../init/ga";
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import config from "@/config";
import { Language } from "@/translations";

Vue.use(Vuex);

export const globalMutations = {
  updateLang: "updateLang",
  updateDrawer: "updateDrawer",
  toggleDrawer: "toggleDrawer",
  updateMaxResults: "updateMaxResults",
  updateRegionCode: "updateRegionCode"
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
    regionCode: "",
    drawer: true
  },
  getters: {},
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    [globalMutations.updateLang](state, lang: Language) {
      state.currentLang = lang;
    },
    [globalMutations.updateDrawer](state, drawer: boolean) {
      GA.sendGeneralEvent("engagement", "drawer", drawer ? "opened" : "closed");
      state.drawer = drawer;
    },
    [globalMutations.toggleDrawer](state) {
      state.drawer = !state.drawer;
    },
    [globalMutations.updateRegionCode](state, regionCode: string) {
      state.regionCode = regionCode;
    }
  }
});

interface AppState {
  currentLang: Language;
  regionCode: string;
  drawer: boolean;
}

export { $store };
