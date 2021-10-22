import fs from "fs";

export type getImagesInDirectoryType = (directory: string) => string[];

export const getImagesInDirectory: getImagesInDirectoryType = (directory) => {
  return fs.readdirSync(directory);
};
