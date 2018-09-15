import "@/assets/styles/vuetify.styl";

import Vue from "vue";
import VApp from "vuetify/es5/components/VApp";
import Vuetify from "vuetify/es5/components/Vuetify";
import VNavigationDrawer from "vuetify/es5/components/VNavigationDrawer";
import * as VToolbar from "vuetify/es5/components/VToolbar";
import VBtn from "vuetify/es5/components/VBtn";
import VIcon from "vuetify/es5/components/VIcon";
import * as VGrid from "vuetify/es5/components/VGrid";
import VFooter from "vuetify/es5/components/VFooter";
import VTextField from "vuetify/es5/components/VTextField";
import * as VCard from "vuetify/es5/components/VCard";
import VForm from "vuetify/es5/components/VForm";
import VDivider from "vuetify/es5/components/VDivider";
import VDialog from "vuetify/es5/components/VDialog";
import VTooltip from "vuetify/es5/components/VTooltip";
import VProgressCircular from "vuetify/es5/components/VProgressCircular";
import VProgressLinear from "vuetify/es5/components/VProgressLinear";
import VAlert from "vuetify/es5/components/VAlert";
import VSelect from "vuetify/es5/components/VSelect";
import VAvatar from "vuetify/es5/components/VAvatar";
import * as VTabs from "vuetify/es5/components/VTabs";
import * as VExpansionPanel from "vuetify/es5/components/VExpansionPanel";
import * as VList from "vuetify/es5/components/VList";
import VMenu from "vuetify/es5/components/VMenu";
import VStepper from "vuetify/es5/components/VStepper";
import transitions from "vuetify/es5/components/transitions";
import directives from "vuetify/es5/directives";
import VBtnToggle from "vuetify/es5/components/VBtnToggle";
import VCarousel from "vuetify/es5/components/VCarousel";
import VCheckbox from "vuetify/es5/components/VCheckbox";
import VDataTable from "vuetify/es5/components/VDataTable";
import VPagination from "vuetify/es5/components/VPagination";
import VDatePicker from "vuetify/es5/components/VDatePicker";

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VTextField,
    VDialog,
    VProgressCircular,
    VProgressLinear,
    VDivider,
    VTooltip,
    ...VToolbar,
    ...VCard,
    ...VTabs,
    VForm,
    VBtn,
    VIcon,
    ...VList,
    VMenu,
    ...VExpansionPanel,
    ...VGrid,
    VFooter,
    VAlert,
    VBtnToggle,
    VSelect,
    VCarousel,
    VCheckbox,
    VAvatar,
    VStepper,
    VDataTable,
    VPagination,
    VDatePicker
  },
  theme: {
    primary: "#4385f3",
    secondary: "#0288D1",
    accent: "#D81B60",
    error: "#DD2C00",
    warning: "#FF9100",
    info: "#2196f3",
    success: "#4caf50",
    grey: "#FAFAFA",
    darkGrey: "#9c9c9c"
  },
  directives,
  transitions
});
