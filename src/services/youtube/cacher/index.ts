import { GA } from "./../../../init/ga";
import {
  CacheObject,
  GetCacheParams,
  SaveCacheParams,
  CacheEntry
} from "./interfaces";
import store from "store2";
import { cloneDeep, pull, remove } from "lodash";

let cacheQ = "cacheQ";
let memCache: CacheObject = {};
var diskCache = store.namespace("gapiCache");

// Rehydrate memCache
diskCache.each((key: string, data) => {
  let keys = key.split(".");
  let method = keys.shift() as string;
  let dataHash = keys.shift() as string;
  if (memCache[method]) {
    memCache[method][dataHash] = data;
  } else {
    memCache[method] = { [dataHash]: data };
  }
});

async function get<T = any>({ method, requestPayload }: GetCacheParams) {
  let dataHash = await generateHash(requestPayload);

  if (memCache[method] && memCache[method][dataHash]) {
    let cachedValue = memCache[method][dataHash] as CacheEntry<T>;
    if (cachedValue.expires > Date.now()) {
      return Promise.resolve(cachedValue.response).then(response => {
        GA.sendGeneralEvent("info", "cached-response", method);
        return cloneDeep(response);
      });
    } else {
      clear(method, requestPayload);
    }
  }
  return Promise.reject(null);
}

async function save({
  duration,
  method,
  requestPayload,
  requestPromise,
  toPersist
}: SaveCacheParams) {
  memCache[method] = memCache[method] || {};
  let dataHash = await generateHash(requestPayload);
  let expires = Date.now() + duration;
  memCache[method][dataHash] = {
    expires,
    response: requestPromise
  };

  requestPromise
    .then(response => {
      memCache[method][dataHash].response = cloneDeep(response);
      if (toPersist) {
        saveData(method, dataHash, expires, response);
      }
    })
    .catch(() => {
      delete memCache[method][dataHash];
    });
}

async function clear(method?: string, requestPayload?: any) {
  if (method && requestPayload) {
    let dataHash = await generateHash(requestPayload);
    if (memCache[method] && memCache[method][dataHash]) {
      delete memCache[method][dataHash];
      diskCache.namespace(method).remove(dataHash);
      let q = store.get(cacheQ) || [];
      pull(q, `${method}.${dataHash}`);
      store.set(cacheQ, q, true);
    }
  } else if (method && !requestPayload) {
    delete memCache[method];
    diskCache.namespace(method).clearAll();
    let q = store.get(cacheQ) || [];
    remove(q, (i: string) => i.split(".")[0] === method);
    store.set(cacheQ, q, true);
  } else if (!method && requestPayload) {
    throw new Error("Invalid argument. Url is mandatory with requestPayload.");
  } else {
    memCache = {};
    store.set(cacheQ, [], true);
    diskCache.clearAll();
    return;
  }
}

async function generateHash(data: any) {
  let sha = await import("js-sha256");
  data = cloneDeep(data);
  return sha.sha224(JSON.stringify(data));
}

function saveData(
  method: string,
  dataHash: string,
  expires: number,
  response: any
) {
  let q: string[] = store.get(cacheQ) || [];

  if (q.length === 25) {
    let [namespace, dataHash] = q.shift()!.split(".");
    diskCache.namespace(namespace).remove(dataHash);
  }

  q.push(`${method}.${dataHash}`);
  store.set(cacheQ, q, true);
  diskCache.namespace(method).set(dataHash, { expires, response }, true);
}

let cache = {
  get,
  save,
  clear
};

export default cache;
