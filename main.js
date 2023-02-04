import queryString from "query-string";
// const jsonServer = require("json-server");
import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
// const { faker } = require("@faker-js/faker");
import { faker } from "@faker-js/faker";
faker.locale = "vi";
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    if (!req.body["title"]) {
      req.body["title"] = `${getTitle.slice(0, 1).toUpperCase()}${getTitle.slice(1)}`;
    }
    if (!req.body["description"]) {
      req.body["description"] = faker.lorem.paragraphs(2, "");
    }
    if (!req.body["author"]) {
      req.body["author"] = faker.name.fullName();
    }
    if (!req.body["imageUrl"]) {
      req.body["imageUrl"] = faker.image.nature(1368, 400);
    }
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method == "PATCH" || req.method == "PUT") {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  const headers = res.getHeaders();

  const totalCountHeader = headers["x-total-count"];
  if (req.method == "GET" && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query);
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 6,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };
    return res.jsonp(result);
  }
  res.jsonp(res.locals.data);
};
// Use default router
server.use("/api", router);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("JSON Server is running");
});
