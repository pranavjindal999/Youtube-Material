import { routes } from "./../../router/routeNames";
import { $router } from "@/router";

const supportedPages = {
  channel: "www.youtube.com/channel",
  video: "www.youtube.com/watch"
};

export async function linkify(text: string) {
  let Autolinker = await import("autolinker");

  return Autolinker.link(text, {
    urls: {
      schemeMatches: true,
      wwwMatches: true,
      tldMatches: true
    },
    email: true,
    phone: false,
    hashtag: "twitter",
    stripPrefix: false,
    newWindow: true,
    truncate: {
      length: 0,
      location: "end"
    },
    replaceFn(match: any) {
      switch (match.getType()) {
        case "url": {
          let href: string = match.getAnchorHref();
          if (href.includes(supportedPages.channel)) {
            let tag = match.buildTag();
            tag.attrs.href = tag.attrs.href.replace(
              "www.youtube.com",
              window.location.host
            );
            tag.attrs.target = "_self";
            return tag;
          }
          if (href.includes(supportedPages.video)) {
            let tag = match.buildTag();
            let params = new URLSearchParams(new URL(tag.attrs.href).search);
            let videoId = params.get("v");
            let newHref = $router.resolve({
              name: routes.video.name,
              params: {
                [routes.video.params.id]: videoId!
              }
            }).href;
            tag.attrs.href = newHref;
            tag.attrs.target = "_self";
            return tag;
          }
        }
      }
      return true;
    }
  });
}
