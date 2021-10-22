import axios from "axios";
import fs from "fs";

describe("POST@/thumbnails/:id/votes", () => {
  beforeEach(() => {
    fs.writeFileSync("./images/backlog/testing.png", "hello world");
  });

  afterEach(() => {
    fs.existsSync("./images/backlog/testing.png") &&
      fs.unlinkSync("./images/backlog/testing.png");
    fs.existsSync("./images/bad/testing.png") &&
      fs.unlinkSync("./images/bad/testing.png");
    fs.existsSync("./images/good/testing.png") &&
      fs.unlinkSync("./images/good/testing.png");
  });

  it("when approving a thumbnail, it should move a thumbnail from the backlog directory to the good directory", async () => {
    const imageId = "testing.png";
    const result = await axios.post(
      `http://localhost:8080/thumbnails/${imageId}/votes`,
      {
        isGood: true,
      }
    );
    const doesGoodFileExist = fs.existsSync(`./images/good/${imageId}`);
    const wasFileRemovedFromBacklog = fs.existsSync(
      `./images/backlog/${imageId}`
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
    const doesBadFileExist = fs.existsSync(`./images/bad/${imageId}`);
    const wasFileRemovedFromBacklog = fs.existsSync(
      `./images/backlog/${imageId}`
    );
    expect(doesBadFileExist).toBeTruthy();
    expect(wasFileRemovedFromBacklog).toBeFalsy();
    expect(result.status).toEqual(200);
  });
});
