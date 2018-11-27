import axios, { AxiosResponse } from "axios";

let featuredCache: string[] | null = null;

const featuredService = {
  getFeaturedVideos() {
    if (featuredCache) {
      return Promise.resolve(featuredCache);
    }
    return axios
      .get("/featured.json")
      .then((response: AxiosResponse<string[]>) => {
        featuredCache = response.data;
        return response.data;
      });
  }
};

export { featuredService };
