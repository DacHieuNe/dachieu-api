// const { faker } = require("@faker-js/faker");
import { faker } from "@faker-js/faker";
import fs from "fs";
// const fs = require("fs");

faker.locale = "vi";

function randomPostList(number) {
  var postList = [];
  Array.from({ length: number }).forEach((e) => {
    let getTitle = faker.lorem.words(3);
    let keyRandomImg = "uFXzHBnQ_zihPePExIVd4ZPU2MyIpSmyWnxmlxjb5-0";
    let unplashAPI = `https://api.unsplash.com/photos/random/?client_id=${keyRandomImg}`;
    let imageAPI = 0;
    fetch(unplashAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        imageAPI = jsonData.urls.regular;
      });
    postList.push({
      id: faker.datatype.uuid(),
      title: `${getTitle.slice(0, 1).toUpperCase()}${getTitle.slice(1)}`,
      author: faker.name.fullName(),
      description: faker.lorem.paragraphs(2, ""),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      imageUrl: imageAPI,
    });
  });
  return postList;
}
(() => {
  var postList = randomPostList(30);
  var db = {
    posts: postList,
  };
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate success");
  });
})();
