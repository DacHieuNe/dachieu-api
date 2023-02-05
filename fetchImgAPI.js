const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

export async function fetchAPI(unplashAPI) {
  let imageRes = 0;
  await fetch(unplashAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      imageRes = jsonData.urls.regular;
    })
    .catch(function (error) {
      console.log(error);
    });
  return imageRes;
}
export function callAPI() {
  let keyRandomImg = "Hlt2sbZ_cX2hXPEhoOxCvHDoYlptjTJGh5dwy4-406U";
  let unplashAPI = `https://api.unsplash.com/photos/random/?client_id=${keyRandomImg}`;
  return fetchAPI(unplashAPI);
}
