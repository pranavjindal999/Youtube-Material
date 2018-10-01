import { asyncRegionCode } from "@/services/geolocation";
import { asyncYoutubeClientAPI } from "@/services/youtube/youtubeClient";
import { i18n } from "@/services/i18n";
import jsonp from "jsonp";
import { toQueryString } from "@/extras/utils";
import { gapiWrapper } from "@/services/youtube/gapiWrapper";

class YoutubeService {
  async searchVideos(parameters: SearchParams) {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.search.list,
      params: {
        channelId: parameters.channelId,
        order: parameters.order,
        part: "snippet",
        type: "video",
        regionCode: await asyncRegionCode,
        maxResults: parameters.maxResults,
        relatedToVideoId: parameters.relatedToVideoId,
        q: parameters.query,
        pageToken: parameters.pageToken
      }
    }).then(result => {
      return result;
    });
  }

  async getVideoDetails(videoIds: string[]) {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.videos.list,
      params: {
        hl: i18n.locale,
        regionCode: await asyncRegionCode,
        part: "snippet,statistics,contentDetails",
        id: videoIds.join(",")
      }
    }).then(result => {
      return result;
    });
  }

  async getChannelDetails(
    channelIds: string[],
    part = "snippet,statistics,brandingSettings"
  ) {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.channels.list,
      params: {
        hl: i18n.locale,
        part: part,
        id: channelIds.join(",")
      }
    }).then(result => {
      return result;
    });
  }

  async getChannelSubscriptions(params: {
    channelId: string;
    pageToken?: string;
    maxResults: number;
  }) {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.subscriptions.list,
      params: {
        channelId: params.channelId,
        part: "snippet",
        order: "alphabetical",
        pageToken: params.pageToken,
        maxResults: params.maxResults
      }
    }).then(result => {
      return result;
    });
  }

  async getAllRegions() {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.i18nRegions.list,
      params: {
        hl: i18n.locale,
        part: "snippet",
        fields: "items/snippet"
      }
    }).then(result => {
      return result.items.map(item => {
        return {
          regionCode: item.snippet.gl,
          regionName: item.snippet.name
        };
      });
    });
  }

  async getAllCategories() {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.videoCategories.list,
      params: {
        part: "snippet",
        hl: i18n.locale,
        regionCode: await asyncRegionCode,
        fields: "eventId,items(id,snippet)"
      }
    }).then(result => {
      return result.items;
    });
  }

  async getCategoryTrendingVideos(params: {
    pageToken?: string;
    videoCategoryId?: string;
    maxResults: number;
  }) {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.videos.list,
      params: {
        part: "snippet,statistics,contentDetails",
        hl: i18n.locale,
        regionCode: await asyncRegionCode,
        chart: "mostPopular",
        maxResults: params.maxResults,
        pageToken: params.pageToken,
        videoCategoryId: params.videoCategoryId
      }
    }).then(result => {
      return result;
    });
  }

  async getVideoComments(params: {
    videoId: string;
    maxResults: number;
    order: "relevance" | "time";
    pageToken?: string;
  }) {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.commentThreads.list,
      params: {
        part: "snippet,replies",
        videoId: params.videoId,
        maxResults: params.maxResults,
        order: params.order,
        pageToken: params.pageToken,
        textFormat: "plainText"
      }
    }).then(result => {
      return result;
    });
  }

  async getCommentReplies(params: {
    commentId: string;
    maxResults: number;
    pageToken: string;
  }) {
    await asyncYoutubeClientAPI;
    return gapiWrapper({
      method: gapi.client.youtube.comments.list,
      params: {
        part: "snippet",
        pageToken: params.pageToken,
        parentId: params.commentId,
        maxResults: params.maxResults
      }
    }).then(result => {
      return result;
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
