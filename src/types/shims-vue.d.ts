declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "load-js" {
  export default function loadJS(urls: Array<string>): Promise<void>;
}
