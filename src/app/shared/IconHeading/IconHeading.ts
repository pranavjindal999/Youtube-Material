import { Vue, Component, Prop } from "vue-property-decorator";
import FloatingDiv from "@/app/shared/FloatingDiv/FloatingDiv.vue";

@Component({
  components: {
    FloatingDiv
  }
})
export default class IconHeading extends Vue {
  @Prop({ type: String, default: "" })
  icon!: string;

  @Prop({ type: String, default: "" })
  text!: string;
}
