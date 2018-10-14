import { GA } from "./../../../init/ga";
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { throttle } from "lodash";

@Component({
  components: {},
  name: "ScrollFire"
})
export default class ScrollFire extends Vue {
  @Prop({ type: Boolean, required: true })
  haveMore!: true;

  isInViewPort: boolean = false;
  onScroll!: () => void;

  @Watch("isInViewPort")
  fire(isInViewPort: boolean, wasPreviouslyInViewPort: boolean) {
    if (isInViewPort && !wasPreviouslyInViewPort && this.haveMore) {
      this.$emit("fire");
      this.isInViewPort = false;
      GA.sendGeneralEvent(
        "engagement",
        "scroll-fire",
        this.$parent.$options.name
      );
    }
  }

  created() {
    /**
     * Assigning throttled scroll handler in created hook.
     * Doing the same during construction binds a different this (which is partially constructed component).
     */
    this.onScroll = throttle(() => {
      if (
        this.$el.getBoundingClientRect().top + 20 <
        document.documentElement!.clientHeight
      ) {
        this.isInViewPort = true;
      } else {
        this.isInViewPort = false;
      }
    }, 250);
  }

  mounted() {
    this.onScroll();
    window.addEventListener("scroll", this.onScroll, {
      passive: true,
      capture: true
    });
  }

  destroyed() {
    window.removeEventListener("scroll", this.onScroll, {
      capture: true
    });
  }
}
