import { globalState } from '@/store';
import { GA } from "@/init/ga";
import {
  trendingCategories
} from "./TrendingCategories";
import { routes } from "@/router/routeNames";
import Vue from "vue";
import Component from "vue-class-component";
import { Location } from "vue-router";

@Component({
  name: "Navigation"
})
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

  get drawerState(){
    return globalState.isDrawerOpen
  }

  updateDrawerState($event: boolean) {
    globalState.updateDrawer($event);
  }

  sendNavigationGA(item: string) {
    GA.sendGeneralEvent("engagement", "navigation-click", item);
  }
}
