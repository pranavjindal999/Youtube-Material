type ListFetcher<T> = (
  maxResults: number,
  pageToken?: string
) => Promise<GoogleApiYouTubePaginationInfo<T>>;
