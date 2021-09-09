const express = require("express");
const { Feed } = require("feed");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const feed = new Feed({
    title: "Blue Apron Recipes",
  });

  const response = await fetch("https://www.blueapron.com/cookbook");
  const body = await response.text();
  const $ = cheerio.load(body);

  $(".recipe-thumb").each((b, item) => {
    const title = $(item).text().trim().replace("\n", " ");
    const relativeLink = $(item).find("a").attr("href");
    const fullUrl = `https://www.blueapron.com${relativeLink}`;

    feed.addItem({
      title: title,
      id: fullUrl,
      link: fullUrl,
    });
  });

  reply
  .code(200)
  .header('Content-Type', 'application/json; charset=utf-8')
  .send(feed.json1())
});

app.listen(port, () => {
});
