import { Vue, Component, Prop } from "vue-property-decorator";
import { LangKeys } from "@/translations";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";
import { linkify } from "@/services/linkify";
import { formatDate } from "@/extras/dateUtils";

@Component({
  components: { FloatingDiv },
  name: "ChannelAbout"
})
export default class ChannelAbout extends Vue {
  @Prop({ required: true, default: null })
  channel!: GoogleApiYouTubeChannelResource | null;

  get channelName() {
    if (this.channel) return this.channel.snippet.localized.title;
  }

  get channelDesc() {
    if (this.channel) {
      return linkify(this.channel.snippet.localized.description);
    }
  }

  get channelInfoItems() {
    if (this.channel)
      return [
        {
          labelKey: LangKeys.joined,
          icon: "date_range",
          value: formatDate(this.channel.snippet.publishedAt, "Do MMM, YYYY")
        },
        {
          labelKey: LangKeys.totalViews,
          icon: "visibility",
          value: (+this.channel.statistics.viewCount).toLocaleString()
        },
        {
          labelKey: LangKeys.subscribers,
          icon: "subscriptions",
          value: (+this.channel.statistics.subscriberCount).toLocaleString()
        },
        {
          labelKey: LangKeys.videos,
          icon: "video_library",
          value: (+this.channel.statistics.videoCount).toLocaleString()
        }
      ];
  }
}
