import fs from "fs";

export const fileMover = async (src: string, dst: string) => {
  fs.renameSync(src, dst);
};
