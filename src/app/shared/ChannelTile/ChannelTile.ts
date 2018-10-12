import { routes } from "@/router/routeNames";
import { Vue, Component, Prop } from "vue-property-decorator";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import { Location } from "vue-router";

@Component({
  components: {
    FloatingDiv
  }
})
export default class ChannelTile extends Vue {
  @Prop({ type: Object, required: false })
  channel?: GoogleApiYouTubeChannelResource;

  get channelRoute(): Location | undefined {
    if (this.channel) {
      return {
        name: routes.channel.name,
        params: {
          [routes.channel.params.id]: this.channel.id
        }
      };
    }
  }

  get thumbnail() {
    if (this.channel) {
      return this.channel.snippet.thumbnails.medium.url;
    }
  }

  get title() {
    if (this.channel) {
      return this.channel.snippet.localized
        ? this.channel.snippet.localized.title
        : this.channel.snippet.title;
    }
  }
}
