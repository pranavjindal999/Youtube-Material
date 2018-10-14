import { GA } from "./../../init/ga";
import Helmet from "@/app/shared/Helmet/Helmet.vue";
import { Vue, Component } from "vue-property-decorator";
import { sleep } from "@/extras/sleep";
import lazyLoadCSS from "lazyload-css";

@Component({
  components: {
    Helmet
  },
  name: "About"
})
export default class About extends Vue {
  isIconLoading = true;

  socials = [
    {
      href: "https://www.linkedin.com/in/pranavjindal999",
      icon: "socicon-linkedin socicon",
      label: "LinkedIn"
    },
    {
      href: "https://www.github.com/pranavjindal999",
      icon: "socicon-github socicon",
      label: "Github"
    },
    {
      href: "https://www.telegram.me/pranavjindal999",
      icon: "socicon-telegram socicon",
      label: "Telegram"
    },
    {
      href: "https://www.facebook.com/pranavjindal999",
      icon: "socicon-facebook socicon",
      label: "Facebook"
    },
    {
      href: "https://www.twitter.com/pranavjindal999",
      icon: "socicon-twitter socicon",
      label: "Twitter"
    }
  ];

  created() {
    lazyLoadCSS(
      "https://d1azc1qln24ryf.cloudfront.net/114779/Socicon/style-cf.css?9ukd8d",
      "socicon"
    ).then(async () => {
      //buffer for download time for woffs
      await sleep(1000);
      this.isIconLoading = false;
    });
  }

  sendContactGA(item: string) {
    GA.sendGeneralEvent("engagement", "about-contact-media-click", item);
  }

  sendTechnologyGA(item: string) {
    GA.sendGeneralEvent("engagement", "about-tech-icon-click", item);
  }
}
