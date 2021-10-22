import express, { Request, Response } from "express";
const app = express();

import { thumbnailMover } from "./thumbnailMover";
import { fileMover } from "./fileMover";

app.use(express.json());

app.post("/thumbnails/:id/votes", async (req: Request, res: Response) => {
  const { id: imageId } = req.params;
  const { isGood } = req.body;
  await thumbnailMover({ fileMover, imageId, isGood });
  res.send("success");
});

app.listen(8080);
