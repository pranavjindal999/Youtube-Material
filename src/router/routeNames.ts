export const routes = {
  home: {
    name: "home"
  },
  search: {
    name: "search",
    params: {
      query: "query"
    }
  },
  trending: {
    name: "trending",
    params: {
      category: "category"
    }
  },
  video: {
    name: "video",
    params: {
      id: "id"
    }
  },
  channel: {
    name: "channel",
    params: {
      id: "id"
    },
    children: {
      home: {
        name: "channel.home"
      },
      videos: {
        name: "channel.videos"
      },
      channels: {
        name: "channel.channels"
      },
      about: {
        name: "channel.about"
      }
    }
  },
  about: {
    name: "about"
  }
};
