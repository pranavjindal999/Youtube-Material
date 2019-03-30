import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import config from "@/config";
import { GlobalState } from './GlobalState';
import { getModule } from 'vuex-module-decorators';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: "ytmat",
  strictMode: config.local
});

const $store = new Vuex.Store({
  plugins: [vuexPersist.plugin],
  strict: config.local,
  modules: {
    GlobalState
  },
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
  }
});

const globalState = getModule(GlobalState, $store);

export { $store, globalState };
