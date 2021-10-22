// import { mocked } from "ts-jest/utils";
import { getImagesInDirectory } from "./getImagesInDirectory";
import fs from "fs";
jest.mock("fs");
// const mockedFs = mocked(fs, true);

describe("getImagesInDirectory", () => {
  beforeEach(() => {
    (fs.readdirSync as jest.Mock).mockReturnValue(["a.png", "b.png", "c.png"]);
  });

  it("returns a list of all files in a directory", async () => {
    const images = getImagesInDirectory("./images/backlog");
    expect(fs.readdirSync).toBeCalledWith("./images/backlog");
    expect(images).toEqual(["a.png", "b.png", "c.png"]);
  });
});
