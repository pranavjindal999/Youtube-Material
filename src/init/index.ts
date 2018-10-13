import "@/assets/styles/global.css";
import lazyLoadCSS from "lazyload-css";

lazyLoadCSS(
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
);

import "./vuetify";
import "./debugSettings";
import "./ga";
import "moment";
import "moment-duration-format";
import "./registerServiceWorker";
import "./offlineHandler";
