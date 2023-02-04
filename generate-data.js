// const { faker } = require("@faker-js/faker");
import { faker } from "@faker-js/faker";
import fs from "fs";
// const fs = require("fs");

faker.locale = "vi";

function randomPostList(number) {
  var postList = [];
  Array.from({ length: number }).forEach((e) => {
    var getTitle = faker.lorem.words(3);
    postList.push({
      id: faker.datatype.uuid(),
      title: `${getTitle.slice(0, 1).toUpperCase()}${getTitle.slice(1)}`,
      author: faker.name.fullName(),
      description: faker.lorem.paragraphs(2, ""),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      imageUrl: faker.image.nature(1368, 400),
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
