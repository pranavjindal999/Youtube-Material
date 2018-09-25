let asyncRegionCode = fetch("https://ip-api.io/json/")
  .then(async response => {
    let data = await response.json();
    return data.country_code;
  })
  .catch(() => {
    return "IN";
  });

export { asyncRegionCode };
