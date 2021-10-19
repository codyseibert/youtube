import { thumbnailMover } from "./thumbnailMover";
import { fileMover } from "./fileMover";

thumbnailMover({ fileMover, imageId: "hello.png", isGood: false }).then(() =>
  console.log("hello")
);
