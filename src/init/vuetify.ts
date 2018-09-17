import "@/assets/styles/vuetify.styl";

import Vue from "vue";
import VApp from "vuetify/es5/components/VApp";
import Vuetify from "vuetify/es5/components/Vuetify";
import VNavigationDrawer from "vuetify/es5/components/VNavigationDrawer";
import * as VToolbar from "vuetify/es5/components/VToolbar";
import VBtn from "vuetify/es5/components/VBtn";
import VIcon from "vuetify/es5/components/VIcon";
import VAutocomplete from "vuetify/es5/components/VAutocomplete";
import * as VGrid from "vuetify/es5/components/VGrid";
import * as VList from "vuetify/es5/components/VList";
import * as VForm from "vuetify/es5/components/VForm";
import VCombobox from "vuetify/es5/components/VCombobox";
import VDivider from "vuetify/es5/components/VDivider";
import VBottomNav from "vuetify/es5/components/VBottomNav";
import * as VCard from "vuetify/es5/components/VCard";
import VImg from "vuetify/es5/components/VImg";
import VHover from "vuetify/es5/components/VHover";
import VProgressCircular from "vuetify/es5/components/VProgressCircular";
import VSubheader from "vuetify/es5/components/VSubheader";
import VResponsive from "vuetify/es5/components/VResponsive";

import transitions from "vuetify/es5/components/transitions";
import * as directives from "vuetify/es5/directives";

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    ...VToolbar,
    VCombobox,
    VResponsive,
    VDivider,
    VBtn,
    VIcon,
    VBottomNav,
    VAutocomplete,
    VProgressCircular,
    VHover,
    VSubheader,
    VImg,
    ...VCard,
    ...VGrid,
    ...VForm,
    ...VList
  },
  theme: {
    primary: "#4385f3",
    secondary: "#0288D1",
    accent: "#D81B60",
    error: "#DD2C00",
    warning: "#FF9100",
    info: "#2196f3",
    success: "#4caf50",
    youtubeRed: "#ff0000",
    white: "#ffffff",
    captionGrey: "#909090"
  },
  directives,
  transitions
});
