export type CacheObject = {
  [methods: string]: {
    [hashes: string]: CacheEntry<any>;
  };
};

export type CacheEntry<T> = {
  expires: number;
  response: T | Promise<T>;
};

export type GetCacheParams = {
  method: string;
  requestPayload: any;
};

export type SaveCacheParams = {
  duration: number;
  method: string;
  requestPayload: any;
  requestPromise: Promise<any>;
  toPersist: boolean | undefined;
};
