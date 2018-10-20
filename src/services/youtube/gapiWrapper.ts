import { LangKeys } from "@/translations";
import { TopProgress } from "./../topProgress/index";
import cache from "@/services/youtube/cacher";
import { ms } from "@/extras/dateUtils";

type GapiWrapperParams<T, K> = {
  method: (params: T) => gapi.client.HttpRequest<K>;
  methodId: string;
  params: T;
  diskCache?: boolean;
  memCache?: boolean;
  cacheDuration?: number;
  isBlocking?: boolean;
  noTopProgress?: boolean;
};

export function gapiWrapper<T, K>({
  method,
  methodId,
  diskCache = false,
  memCache = false,
  cacheDuration = ms(5, "min"),
  isBlocking = false,
  noTopProgress = false,
  params
}: GapiWrapperParams<T, K>): Promise<K> {
  let requestPromise = cache
    .get<K>({
      method: methodId,
      requestPayload: params
    })
    .then(result => {
      return result;
    })
    .catch(async () => {
      let gapiPromise = method(params).then(response => {
        return response;
      });

      let handledPromise = gapiPromise
        .then(response => {
          return response.result;
        })
        .catch((errResonse: HttpRequestRejected) => {
          try {
            return Promise.reject(
              "errors." + errResonse.result.error.errors[0].reason
            );
          } catch (e) {
            return Promise.reject(LangKeys.errors.somethingWentWrong);
          }
        });

      let duration = cacheDuration;

      if (diskCache || memCache) {
        await cache.save({
          duration,
          method: methodId,
          requestPayload: params,
          requestPromise: handledPromise,
          toPersist: diskCache
        });
      }

      return handledPromise;
    });

  if (!noTopProgress) {
    TopProgress.startAuto(requestPromise);
  }

  return requestPromise;
}
