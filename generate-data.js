// const { faker } = require("@faker-js/faker");
import { faker } from "@faker-js/faker";
import fs from "fs";
import { callAPI } from "./fetchImgAPI.js";
// mod.cjs

faker.locale = "vi";

async function randomPostList(number) {
  return await new Promise(async (resolve, reject) => {
    let postList = [];
    let arr = Array.from({ length: number });
    arr.forEach(async (e, i) => {
      let getTitle = faker.lorem.words(3);
      let imageRes = 0;
      await callAPI().then(function (data) {
        imageRes = data;
      });
      postList.push({
        id: faker.datatype.uuid(),
        title: `${getTitle.slice(0, 1).toUpperCase()}${getTitle.slice(1)}`,
        author: faker.name.fullName(),
        description: faker.lorem.paragraphs(2, ""),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        imageUrl: imageRes,
      });
      if (i == arr.length - 1) {
        resolve(postList);
      }
    });
  });
}
function WriteFile(db) {
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Generate success");
  });
}
(async () => {
  var postList;
  await randomPostList(12).then(function (response) {
    postList = response;
  });
  console.log(postList);
  var db = {
    posts: postList,
  };
  WriteFile(db);
})();
