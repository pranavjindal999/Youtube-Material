import Vue from "vue";
import Component from "vue-class-component";

import Header from "./Header/Header.vue";
import Navigation from "./Navigation/Navigation.vue";

@Component({
  components: {
    Header,
    Navigation
  }
})
export default class Root extends Vue {}
