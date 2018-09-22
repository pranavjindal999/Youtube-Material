import Vue from "vue";

export const EventBus = new Vue();

export enum EventNames {
  clearSearchText = "clearSearchText",
  playerReady = "playerReady"
}
