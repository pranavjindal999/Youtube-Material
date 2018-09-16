import Vue from "vue";
import Component from "vue-class-component";

import Header from "./Header/Header.vue";
import Navigation from "./Navigation/Navigation.vue";
import VideoBar from "./VideoBar/VideoBar.vue";

@Component({
  components: {
    Header,
    Navigation,
    VideoBar
  }
})
export default class Root extends Vue {}
