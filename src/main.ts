import "./init";
import Vue from "vue";
import { $store } from "@/store";
import { $router } from "@/router";
import Root from "./app/Root.vue";

new Vue({
  router: $router,
  store: $store,
  render: h => h(Root)
}).$mount("#ytmat");
