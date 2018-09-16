import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/app/HomePage/HomePage.vue";

Vue.use(Router);

const $router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "",
      component: HomePage
    }
    // {
    //   path: "*",
    //   redirect: "/"
    // }
  ]
});

export { $router };
