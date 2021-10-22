import express, { Request, Response } from "express";
const app = express();

import { thumbnailMover } from "./thumbnailMover";
import { fileMover } from "./fileMover";
import { getRandomImage } from "./getRandomImage";
import { getImagesInDirectory } from "./getImagesInDirectory";

app.use(express.json());

app.post("/thumbnails/:id/votes", async (req: Request, res: Response) => {
  const { id: imageId } = req.params;
  const { isGood } = req.body;
  await thumbnailMover({ fileMover, imageId, isGood });
  res.send("success");
});

app.get("/thumbnails/random", async (req: Request, res: Response) => {
  const randomImagePath = await getRandomImage({ getImagesInDirectory });
  res.send(randomImagePath);
});

app.listen(8080);
