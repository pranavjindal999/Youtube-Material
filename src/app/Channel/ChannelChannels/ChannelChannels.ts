import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class ChannelChannels extends Vue {
  @Prop({ type: String, required: true })
  id!: string;
}
