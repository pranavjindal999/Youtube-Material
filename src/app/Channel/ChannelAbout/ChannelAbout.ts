import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class ChannelAbout extends Vue {
  @Prop({ type: String, default: "" })
  someProp!: string;
}
