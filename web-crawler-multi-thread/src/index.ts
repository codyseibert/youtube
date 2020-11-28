import * as fetch from "node-fetch";
import * as cheerio from "cheerio";
import * as path from "path";
import * as urlParser from "url";
import * as fs from "fs";

const getFullUrl = ({ url, host, protocol }) => {
  let fullUrl = null;
  if (url.includes("http")) {
    fullUrl = url;
  } else if (url.startsWith("/")) {
    fullUrl = `${protocol}//${host}${url}`;
  } else {
    fullUrl = `${protocol}//${host}/${url}`;
  }
  return fullUrl.replace(/\/$/, "");
};

const downloadImage = (imageUrl) =>
  fetch(imageUrl)
    .then((res) => {
      const filename = path.basename(imageUrl);
      const dest = fs.createWriteStream(path.join("./images", filename));
      res.body.pipe(dest);
    })
    .catch((err) => console.log(err));

const downloadImages = ({ $images, host, protocol }) => {
  return Promise.all(
    $images
      .map((i, $link) => $link.attribs.src)
      .map((i, src) => getFullUrl({ url: src, host, protocol }))
      .map((i, imageUrl) => downloadImage(imageUrl))
      .get()
  );
};

const crawlLinks = ({ $links, host, protocol, ignoreUrlWith, seenUrls }) => {
  return Promise.all(
    $links
      .map((i, $link) => $link.attribs.href)
      .map((i, href) => getFullUrl({ url: href, host, protocol }))
      .filter((i, href) => href.includes(host))
      .map((i, url) => crawl({ url, ignoreUrlWith, seenUrls }))
      .get()
  );
};

const crawl = async ({ url, ignoreUrlWith, seenUrls }) => {
  if (ignoreUrlWith.some((ignore) => url.includes(ignore))) return;
  if (seenUrls[url]) return;
  seenUrls[url] = true;

  console.log(`crawling ${url}`);

  const { host, protocol } = urlParser.parse(url);

  const html = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(html);
  const $images = $("img");
  const $links = $("a");

  await downloadImages({ $images, host, protocol });
  await crawlLinks({ $links, host, protocol, ignoreUrlWith, seenUrls });
};

crawl({
  url: "http://stevescooking.blogspot.com",
  ignoreUrlWith: ["/search?"],
  seenUrls: {},
});
