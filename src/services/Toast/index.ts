import ToastVue from "./component/Toast.vue";
import ToastComponent from "./component/Toast";

let instance = new ToastVue() as ToastComponent;

let div = document.createElement("div");
document.body.appendChild(div);

instance.$mount(div);

export const Toast = {
  show: instance.show,
  hide: instance.hide
};
