const fs = require("fs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const channels = require("./channels.json");
const channelNames = Object.keys(channels);

const main = async () => {
  let urls = [];

  for (let channelName of channelNames) {
    const videos = channels[channelName];
    urls = [...urls, ...videos.map(({ thumbnail }) => thumbnail)];
  }

  let currentUrl = 0;
  urls = urls.splice(6992);
  for (let url of urls) {
    try {
      const { data: thumbnailImage } = await axios.get(url);
      // console.log(thumbnailImage);
      // fs.writeFileSync(`./thumbnails/${uuidv4()}.png`, thumbnailImage);
      // process.exit(0);

      const writer = fs.createWriteStream(`./thumbnails/${uuidv4()}.png`);

      const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
      });

      response.data.pipe(writer);
      await new Promise((resolve) => writer.on("finish", resolve));
    } catch (err) {
      console.log("could not download", url);
    }
    console.log(`finished ${currentUrl++} / ${urls.length}`);
  }
};
main();
