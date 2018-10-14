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
  },
  name: "Root"
})
export default class Root extends Vue {}
