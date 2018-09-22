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
    twitter: false,
    hashtag: "twitter",

    stripPrefix: false,
    newWindow: true,

    truncate: {
      length: 0,
      location: "end"
    }
  });
}
