import { LangKeys } from "@/translations";
import { TopProgress } from "./../topProgress/index";
export function gapiWrapper<T, K>(request: {
  method: (params: T) => gapi.client.HttpRequest<K>;
  params: T;
}): Promise<K> {
  let requestPromise = request
    .method(request.params)
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

  TopProgress.startAuto(requestPromise);

  return requestPromise;
}
