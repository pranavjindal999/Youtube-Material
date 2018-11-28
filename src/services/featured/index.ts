import { shuffle } from "lodash";
import axios, { AxiosResponse } from "axios";

let featuredCache: string[] | null = null;

const featuredService = {
  getFeaturedVideos(maxResults: number = Infinity, pageToken?: string) {
    if (featuredCache) {
      return Promise.resolve(paginate(featuredCache, maxResults, pageToken));
    }
    return axios
      .get("/featured.json")
      .then((response: AxiosResponse<string[]>) => {
        let shuffledList = shuffle(response.data);
        featuredCache = shuffledList;
        return paginate(shuffledList, maxResults, pageToken);
      });

    function paginate<T>(
      array: T[],
      maxResults: number,
      pageToken?: string
    ): { items: T[]; nextPageToken?: string; prevPageToken?: string } {
      let position: number;
      if (pageToken) {
        position = +pageToken;
      } else {
        position = 0;
      }

      if (maxResults === Infinity) {
        return { items: array };
      } else {
        return {
          items: array.slice(position, position + maxResults),
          nextPageToken:
            position + maxResults >= array.length
              ? undefined
              : `${position + maxResults}`,
          prevPageToken: position ? `${position - maxResults}` : undefined
        };
      }
    }
  },
  async isFeaturedVideo(videoId: string) {
    let videoIds = (await this.getFeaturedVideos()).items;
    return videoIds.includes(videoId);
  }
};

export { featuredService };
