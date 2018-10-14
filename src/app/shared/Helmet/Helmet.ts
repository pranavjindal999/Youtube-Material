import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
  name: "Helmet"
})
export default class Helmet extends Vue {
  @Prop({ type: String, default: "" })
  title!: string;

  @Watch("title", { immediate: true })
  titleUpdater() {
    document.title = this.title ? `vTyoob - ${this.title}` : "vTyoob";
  }

  render() {}
}
