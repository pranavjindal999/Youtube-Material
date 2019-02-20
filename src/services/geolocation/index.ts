import { globalState } from '@/store';
import axios from "axios";

let asyncRegionCode = Promise.resolve(globalState.regionCode)
  .then(storedRegion => {
    if (storedRegion) {
      return storedRegion;
    } else {
      throw "";
    }
  })
  .catch(() => {
    return axios
      .get("https://ip.nf/me.json")
      .then(({ data }) => {
        globalState.updateRegionCode(data.ip.country_code)
        return data.ip.country_code;
      })
      .catch(() => {
        return "IN";
      });
  });

export { asyncRegionCode };
