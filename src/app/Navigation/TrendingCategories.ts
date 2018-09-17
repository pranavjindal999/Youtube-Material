import { routes } from "@/router/routeNames";
import { Location } from "vue-router";

export const trendingCategories = [
  {
    id: "10",
    name: "music",
    labelKey: "music",
    icon: "music_video",
    get route(): Location {
      return {
        name: routes.trending.name,
        params: { [routes.trending.params.category]: this.name }
      };
    }
  },
  {
    id: "1",
    name: "movies",
    labelKey: "movies",
    icon: "movie",
    get route(): Location {
      return {
        name: routes.trending.name,
        params: { [routes.trending.params.category]: this.name }
      };
    }
  },
  {
    id: "17",
    name: "sports",
    labelKey: "sports",
    icon: "directions_run",
    get route(): Location {
      return {
        name: routes.trending.name,
        params: { [routes.trending.params.category]: this.name }
      };
    }
  },
  {
    id: "28",
    name: "tech",
    labelKey: "technology",
    icon: "devices_other",
    get route(): Location {
      return {
        name: routes.trending.name,
        params: { [routes.trending.params.category]: this.name }
      };
    }
  },
  {
    id: "23",
    name: "comedy",
    labelKey: "comedy",
    icon: "insert_emoticon",
    get route(): Location {
      return {
        name: routes.trending.name,
        params: { [routes.trending.params.category]: this.name }
      };
    }
  }
];
