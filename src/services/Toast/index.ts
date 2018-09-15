import Toast from "./component/Toast.vue";
import ToastComponent from "./component/Toast";

let instance = new Toast() as ToastComponent;

let div = document.createElement("div");
document.body.appendChild(div);

instance.$mount(div);

export default {
  show: instance.show,
  hide: instance.hide
};
