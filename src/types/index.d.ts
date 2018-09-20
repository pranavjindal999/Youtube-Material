type VideoListFetcher = (
  maxResults: number,
  pageToken?: string
) => Promise<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeVideoResource>>;
