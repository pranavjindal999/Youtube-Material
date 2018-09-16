import { routes } from "./routeNames";
import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/app/HomePage/HomePage.vue";
import SearchResults from "@/app/SearchResults/SearchResults.vue";

Vue.use(Router);

const $router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: routes.home.name,
      path: "/video/:id",
      component: HomePage,
      props: true
    },
    {
      name: routes.search.name,
      path: "/search/:query",
      component: SearchResults,
      props: true
    }
  ]
});

export { $router };
