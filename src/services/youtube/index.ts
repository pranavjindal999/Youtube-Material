import { $store } from "@/store";
import { asyncYoutubeClientAPI } from "@/services/youtube/youtubeClient";
import { toQueryString } from "lodash";
import { i18n } from "@/services/i18n";
import jsonp from "jsonp";

class YoutubeService {
  async searchVideos(parameters: any) {
    await asyncYoutubeClientAPI;
    return gapi.client.youtube.search
      .list({
        channelId: parameters.channelId,
        order: parameters.order,
        part: "snippet",
        type: "video",
        regionCode: await $store.state.regionCode,
        maxResults: parameters.maxResults || 12,
        relatedToVideoId: parameters.relatedToVideoId,
        q: parameters.query,
        pageToken: parameters.pageToken
      })
      .then(function(response) {
        return response.result;
      });
  }

  async getVideoDetails(videoIds: string[]) {
    await asyncYoutubeClientAPI;
    return gapi.client.youtube.videos
      .list({
        part: "statistics,contentDetails",
        id: videoIds.join(",")
      })
      .then(({ result }) => {
        return result;
      });
  }

  async getAllRegions() {
    await asyncYoutubeClientAPI;
    return gapi.client.youtube.i18nRegions
      .list({
        part: "snippet",
        fields: "items/snippet"
      })
      .then(({ result }) => {
        return result.items.map(item => {
          return {
            regionCode: item.snippet.gl,
            regionName: item.snippet.name
          };
        });
      });
  }

  async getSuggestions(query: string) {
    return new Promise<string[]>((resolve, reject) => {
      jsonp(
        `https://suggestqueries.google.com/complete/search?${toQueryString({
          ds: "yt",
          client: "firefox",
          hl: i18n.locale,
          q: query
        })}`,
        {},
        (err, data) => {
          if (err) {
            reject();
          } else {
            resolve(data[1]);
          }
        }
      );
    });
  }
}

const youtubeService = new YoutubeService();

export { youtubeService };
