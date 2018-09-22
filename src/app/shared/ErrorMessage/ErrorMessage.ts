import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class ErrorMessage extends Vue {
  @Prop({ type: String, default: "" })
  text!: string;
}
