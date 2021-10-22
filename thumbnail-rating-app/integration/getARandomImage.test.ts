import axios from "axios";
import fs from "fs";

describe("GET@/thumbnails/random", () => {
  beforeEach(() => {
    fs.writeFileSync("./images/backlog/a.png", "hello world");
    fs.writeFileSync("./images/backlog/b.png", "hello world");
    fs.writeFileSync("./images/backlog/c.png", "hello world");
  });

  afterEach(() => {
    fs.existsSync("./images/backlog/a.png") &&
      fs.unlinkSync("./images/backlog/a.png");
    fs.existsSync("./images/backlog/b.png") &&
      fs.unlinkSync("./images/backlog/b.png");
    fs.existsSync("./images/backlog/c.png") &&
      fs.unlinkSync("./images/backlog/c.png");
  });

  it("verify a random image id is returned", async () => {
    const result = await axios.get(`http://localhost:8080/thumbnails/random`);
    expect(["a.png", "b.png", "c.png"]).toContain(result.data);
  });
});
