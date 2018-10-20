type ListFetcher<T> = (
  maxResults: number,
  pageToken?: string
) => Promise<GoogleApiYouTubePaginationInfo<T>>;

declare module "load-js" {
  export default function loadJS(urls: Array<string>): Promise<void>;
}

declare module "lazyload-css" {
  export default function loadCSS(url: string, id?: string): Promise<void>;
}

declare module "autolinker";
declare module "vuetify/es5/mixins/*";
declare module "vue-analytics";

declare var __COMMITHASH__: string;

declare interface Window {
  dataLayer: Array<any>;
  gtag: (...args: any[]) => void;
  __COMMITHASH__: string;
  enableDebugInfo: () => void;
  disableDebugInfo: () => void;
  onYouTubeIframeAPIReady: () => void;
  gapiClientPromise: Promise<void>;
}
