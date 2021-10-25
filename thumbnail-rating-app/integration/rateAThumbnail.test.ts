import axios from "axios";
import fs from "fs";

describe("POST@/thumbnails/:id/votes", () => {
  beforeEach(() => {
    fs.writeFileSync("./public/images/backlog/testing.png", "hello world");
  });

  afterEach(() => {
    fs.existsSync("./public/images/backlog/testing.png") &&
      fs.unlinkSync("./public/images/backlog/testing.png");
    fs.existsSync("./public/images/bad/testing.png") &&
      fs.unlinkSync("./public/images/bad/testing.png");
    fs.existsSync("./public/images/good/testing.png") &&
      fs.unlinkSync("./public/images/good/testing.png");
  });

  it("when approving a thumbnail, it should move a thumbnail from the backlog directory to the good directory", async () => {
    const imageId = "testing.png";
    const result = await axios.post(
      `http://localhost:8080/thumbnails/${imageId}/votes`,
      {
        isGood: true,
      }
    );
    const doesGoodFileExist = fs.existsSync(`./public/images/good/${imageId}`);
    const wasFileRemovedFromBacklog = fs.existsSync(
      `./public/images/backlog/${imageId}`
    );
    expect(doesGoodFileExist).toBeTruthy();
    expect(wasFileRemovedFromBacklog).toBeFalsy();
    expect(result.status).toEqual(200);
  });

  it("when disapproving a thumbnail, it should move a thumbnail from the backlog directory to the bad directory", async () => {
    const imageId = "testing.png";
    const result = await axios.post(
      `http://localhost:8080/thumbnails/${imageId}/votes`,
      {
        isGood: false,
      }
    );
    const doesBadFileExist = fs.existsSync(`./public/images/bad/${imageId}`);
    const wasFileRemovedFromBacklog = fs.existsSync(
      `./public/images/backlog/${imageId}`
    );
    expect(doesBadFileExist).toBeTruthy();
    expect(wasFileRemovedFromBacklog).toBeFalsy();
    expect(result.status).toEqual(200);
  });
});
