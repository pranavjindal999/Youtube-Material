import Vue from "vue";

export const EventBus = new Vue();

export enum GlobalEvents {
  clearSearchText = "clearSearchText"
}
