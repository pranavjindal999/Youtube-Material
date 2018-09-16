import axios from "axios";

let asyncRegionCode = axios
  .get("https://ip-api.io/json/")
  .then(({ data }) => {
    return data.country_code;
  })
  .catch(() => {
    return "IN";
  });

export { asyncRegionCode };
