import { routes } from "./../../router/routeNames";
import { Vue, Component, Prop } from "vue-property-decorator";
import { Location } from "vue-router";
import { youtubeService } from "@/services/youtube";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";

type TabsListItem = {
  labelKey: string;
  icon: string;
  route: Location;
};
@Component({
  components: {
    FloatingDiv
  }
})
export default class Channel extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  channel: GoogleApiYouTubeChannelResource | null = null;

  tabs: TabsListItem[] = [
    {
      labelKey: "home",
      icon: "home",
      route: {
        name: routes.channel.children.home.name
      }
    },
    {
      labelKey: "videos",
      icon: "video_library",
      route: {
        name: routes.channel.children.videos.name
      }
    },
    {
      labelKey: "channels",
      icon: "tv",
      route: {
        name: routes.channel.children.channels.name
      }
    },
    {
      labelKey: "about",
      icon: "info_outline",
      route: {
        name: routes.channel.children.about.name
      }
    }
  ];

  get coverUrl() {
    if (this.channel) {
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.channel.brandingSettings.image.bannerMobileImageUrl;
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        return this.channel.brandingSettings.image.bannerTabletImageUrl;
      } else {
        return this.channel.brandingSettings.image.bannerTabletExtraHdImageUrl;
      }
    }
  }

  get coverAspect() {
    if (this.$vuetify.breakpoint.smAndDown) {
      return 640 / 175;
    } else if (this.$vuetify.breakpoint.lgAndDown) {
      return 1707 / 283;
    } else {
      return 2560 / 424;
    }
  }

  get lazyCoverUrl() {
    if (this.channel) {
      return this.channel.brandingSettings.image.bannerMobileLowImageUrl;
    }
  }

  get title() {
    if (this.channel) {
      return this.channel.snippet.title;
    }
  }

  get thumbnail() {
    if (this.channel) {
      return this.channel.snippet.thumbnails.medium.url;
    }
  }

  created() {
    this.getChannelInfo();
  }

  getChannelInfo() {
    youtubeService.getChannelDetails([this.id]).then(result => {
      this.channel = result.items[0];
    });
  }
}
