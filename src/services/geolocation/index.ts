import { $store, globalMutations } from "@/store";
import axios from "axios";

let asyncRegionCode = Promise.resolve($store.state.regionCode)
  .then(storedRegion => {
    if (storedRegion) {
      return storedRegion;
    } else {
      throw "";
    }
  })
  .catch(() => {
    return axios
      .get("https://ip-api.io/json/")
      .then(({ data }) => {
        $store.commit(globalMutations.updateRegionCode, data.country_code);
        return data.country_code;
      })
      .catch(() => {
        return "IN";
      });
  });

export { asyncRegionCode };
