import { globalMutations } from "./../../store/index";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Navigation extends Vue {
  drawer = false;

  updateDrawerState($event: boolean) {
    this.$store.commit(globalMutations.updateDrawer, $event);
  }
}
