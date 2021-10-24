import { getImagesInDirectoryType } from "./getImagesInDirectory";

interface getRandomImageOpts {
  getImagesInDirectory: getImagesInDirectoryType;
}

export const getRandomImage = (options: getRandomImageOpts) => {
  const images = options.getImagesInDirectory("./public/images/backlog");
  return images[Math.floor(Math.random() * images.length)];
};
