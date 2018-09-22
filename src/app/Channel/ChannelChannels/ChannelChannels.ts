import { LangKeys } from "@/translations";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { youtubeService } from "@/services/youtube";
import ChannelTile from "@/app/shared/ChannelTile/ChannelTile.vue";
import IconHeading from "@/app/shared/IconHeading/IconHeading.vue";
import { DeferredObservable } from "@/extras/DeferredObservable";
import ErrorMessage from "@/app/shared/ErrorMessage/ErrorMessage.vue";
import InfiniteChannelList from "@/app/shared/InfiniteList/InfiniteChannelList/InfiniteChannelList.vue";

@Component({
  components: {
    ChannelTile,
    IconHeading,
    InfiniteChannelList,
    ErrorMessage
  }
})
export default class ChannelChannels extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  @Prop({ required: true, default: null })
  channel!: GoogleApiYouTubeChannelResource | null;

  featuredChannels: GoogleApiYouTubeChannelResource[] = new Array(6);
  resetDeferred = new DeferredObservable();
  canSeeSubs = true;
  isSubsVisible = false;
  noFeaturedError = "";

  get subscriptionFetcher(): ListFetcher<GoogleApiYouTubeChannelResource> {
    return (maxResults, pageToken) => {
      return youtubeService
        .getChannelSubscriptions({
          maxResults,
          pageToken,
          channelId: this.id
        })
        .then(subResult => {
          this.isSubsVisible = true;
          let ids = subResult.items.map(i => i.snippet.resourceId.channelId);
          return youtubeService
            .getChannelDetails(ids, "snippet")
            .then(result => {
              subResult.items = result.items as any;
              return subResult as any;
            });
        })
        .catch(err => {
          if (err.status === 403) {
            this.canSeeSubs = false;
          }
          throw "";
        });
    };
  }

  get featuredChannelsTitle() {
    if (this.channel) {
      this.getFeaturedChannels();
      return (
        this.channel.brandingSettings.channel.featuredChannelsTitle ||
        LangKeys.featuredChannels
      );
    }
  }

  @Watch("id")
  reset() {
    this.featuredChannels = new Array(6);
    this.resetDeferred.next();
    this.canSeeSubs = true;
    this.isSubsVisible = false;
  }

  getFeaturedChannels() {
    let ids = this.channel!.brandingSettings.channel.featuredChannelsUrls;
    if (ids) {
      youtubeService.getChannelDetails(ids, "snippet").then(result => {
        this.featuredChannels = result.items;
      });
    } else {
      this.featuredChannels = [];
      this.noFeaturedError = LangKeys.noChannelsFeatured;
    }
  }
}
