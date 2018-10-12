export type SearchParams = {
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
  maxResults: number;
};

export enum CommentThreadOrder {
  RELEVANCE = "relevance",
  TIME = "time"
}
