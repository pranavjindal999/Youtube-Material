import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    $gaEvent: (
      event: {
        action: string;
        category: string;
        label?: string;
        value?: string;
      }
    ) => void;
  }
}
