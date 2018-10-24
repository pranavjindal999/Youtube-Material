import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { routes } from "@/router/routeNames";

@Component({
  components: {},
  name: "Helmet"
})
export default class Helmet extends Vue {
  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: String, default: "" })
  description!: string;

  @Prop({ type: String, default: "" })
  image!: string;

  @Watch("title", { immediate: true })
  titleUpdater() {
    document.title = this.title ? `vTyoob - ${this.title}` : "vTyoob";
    let metaTitle = document.getElementById("meta-title") as HTMLMetaElement;
    metaTitle.content = document.title;
  }

  @Watch("description", { immediate: true })
  descriptionUpdater() {
    let metaDescription = document.getElementById(
      "meta-description"
    ) as HTMLMetaElement;
    let metaOGDescription = document.getElementById(
      "meta-og-description"
    ) as HTMLMetaElement;

    metaOGDescription.content = this.description;
    metaDescription.content = this.description;
  }

  @Watch("image", { immediate: true })
  imageUpdater() {
    let metaImage = document.getElementById("meta-image") as HTMLMetaElement;
    if (this.image) {
      metaImage.content = this.image;
    } else {
      metaImage.content = window.location.origin + "/img/only-logo.png";
    }
  }

  @Watch("$route.fullPath", { immediate: true })
  metaUpdator() {
    let link = document.getElementById("canonical-link") as HTMLLinkElement;
    let metaUrl = document.getElementById("meta-url") as HTMLMetaElement;
    let metaType = document.getElementById("meta-type") as HTMLMetaElement;
    let metaImage = document.getElementById("meta-image") as HTMLMetaElement;

    link.href = document.location.href;
    metaUrl.content = document.location.href;

    if (this.$route.name === routes.video.name) {
      metaType.content = "video.other";
      metaImage.content = `https://img.youtube.com/vi/${
        this.$route.params[routes.video.params.id]
      }/hqdefault.jpg`;
    } else {
      metaType.content = "website";
      metaImage.content = window.location.origin + "/img/only-logo.png";
    }
  }

  render() {}
}
