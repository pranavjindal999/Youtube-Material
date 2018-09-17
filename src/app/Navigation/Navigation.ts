import { trendingCategories } from "./TrendingCategories";
import { routes } from "@/router/routeNames";
import { globalMutations } from "./../../store/index";
import Vue from "vue";
import Component from "vue-class-component";
import { Location } from "vue-router";

@Component({})
export default class Navigation extends Vue {
  drawer = false;

  categories = trendingCategories;

  homeRoute: Location = {
    name: routes.home.name
  };

  trendingRoute: Location = {
    name: routes.trending.name
  };

  aboutRoute: Location = {
    name: routes.about.name
  };

  updateDrawerState($event: boolean) {
    this.$store.commit(globalMutations.updateDrawer, $event);
  }
}
