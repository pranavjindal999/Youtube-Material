import { TopProgress } from "./../topProgress/index";
export function gapiWrapper<T, K>(request: {
  method: (params: T) => gapi.client.HttpRequest<K>;
  params: T;
}): Promise<K> {
  let requestPromise = request.method(request.params).then(response => {
    return response.result;
  });

  TopProgress.startAuto(requestPromise);

  return requestPromise;
}
