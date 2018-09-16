import "./init";
import Vue from "vue";
import { $store } from "@/store";
import { $router } from "@/router";
import Root from "./app/Root.vue";
import { i18n } from "@/services/i18n";

new Vue({
  router: $router,
  store: $store,
  i18n,
  render: h => h(Root)
}).$mount("#ytmat");
