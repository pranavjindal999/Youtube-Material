import { $store, globalMutations } from "@/store";
import Header from "./Header/Header.vue";
import Navigation from "./Navigation/Navigation.vue";
import VideoWrapper from "./VideoWrapper/VideoWrapper.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    Header,
    Navigation,
    VideoWrapper
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
