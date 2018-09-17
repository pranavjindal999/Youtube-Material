import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { throttle } from "lodash";

@Component({
  components: {}
})
export default class ScrollFire extends Vue {
  @Prop({ type: Boolean, required: true })
  haveMore!: true;

  inViewPort: boolean = false;

  $refs!: {
    el: HTMLDivElement;
  };

  @Watch("inViewPort")
  fire(newV: boolean, oldV: boolean) {
    if (newV && !oldV && this.haveMore) {
      this.$emit("fire");
    }
  }

  onScroll() {
    if (
      this.$refs.el.getBoundingClientRect().bottom <
      document.documentElement.clientHeight
    ) {
      this.inViewPort = true;
    } else {
      this.inViewPort = false;
    }
  }

  mounted() {
    this.onScroll();
    window.addEventListener("scroll", this.onScroll, true);
  }

  destroyed() {
    window.removeEventListener("scroll", this.onScroll, true);
  }
}
