import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
  name: "ErrorMessage"
})
export default class ErrorMessage extends Vue {
  @Prop({ type: String, default: "" })
  text!: string;
}
