type SearchParams = {
  channelId?: string;
  order?:
    | "date"
    | "rating"
    | "relevance"
    | "title"
    | "videoCount"
    | "viewCount";
  relatedToVideoId?: string;
  query?: string;
  pageToken?: string;
};
