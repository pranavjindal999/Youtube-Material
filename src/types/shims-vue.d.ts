declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "load-js" {
  export default function loadJS(urls: Array<string>): Promise<void>;
}
declare module "lazyload-css" {
  export default function loadCSS(url: string, id?: string): Promise<void>;
}

declare module "autolinker";
declare module "vuetify/es5/mixins/*";

declare var __COMMITHASH__: string;
