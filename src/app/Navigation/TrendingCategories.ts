import { LangKeys } from "@/translations";
import { routes } from "@/router/routeNames";
import { Location } from "vue-router";

export enum CustomTrendingCategory {
  FEATURED = "featured"
}

export const trendingCategories = [
  {
    id: CustomTrendingCategory.FEATURED,
    name: "featured",
    labelKey: LangKeys.featured,
    icon: "movie_filter",
    get route(): Location {
      return {
        name: routes.trending.name,
        params: { [routes.trending.params.category]: this.name }
      };
    }
  },
  {
    id: "10",
    name: "music",
    labelKey: LangKeys.music,
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
    labelKey: LangKeys.movies,
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
    labelKey: LangKeys.sports,
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
    labelKey: LangKeys.technology,
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
    labelKey: LangKeys.comedy,
    icon: "insert_emoticon",
    get route(): Location {
      return {
        name: routes.trending.name,
        params: { [routes.trending.params.category]: this.name }
      };
    }
  }
];
