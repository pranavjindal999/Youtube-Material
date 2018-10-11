import "@babel/polyfill";
import "./init";
import Vue from "vue";
import { $store, globalMutations } from "@/store";
import { $router } from "@/router";
import Root from "./app/Root.vue";
import { i18n } from "@/services/i18n";

import "./directives/AsyncBind";
import "./directives/Swipable";
import "./directives/SyncWidth";

new Vue({
  router: $router,
  store: $store,
  i18n,
  render: h => h(Root)
})
  .$mount("#ytmat")
  .$nextTick(() => {
    $store.commit(
      globalMutations.updateDrawer,
      Vue.prototype.$vuetify.breakpoint.mdAndDown ? false : true
    );
  });
