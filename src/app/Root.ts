import { $store, globalMutations } from "@/store";
import Header from "./Header/Header.vue";
import Navigation from "./Navigation/Navigation.vue";
import VideoBar from "./VideoBar/VideoBar.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    Header,
    Navigation,
    VideoBar
  }
})
export default class Root extends Vue {
  mounted() {
    this.onResize();
  }

  onResize() {
    if (this.$vuetify.breakpoint.smAndDown) {
      $store.commit(globalMutations.updateMaxResults, 8);
    } else if (this.$vuetify.breakpoint.mdAndDown) {
      $store.commit(globalMutations.updateMaxResults, 12);
    } else {
      $store.commit(globalMutations.updateMaxResults, 18);
    }
  }
}
