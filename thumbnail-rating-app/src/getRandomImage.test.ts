import { getRandomImage } from "./getRandomImage";

describe("getRandomImage", () => {
  it("returns a random image from the ./images/backlog directory", async () => {
    const images = ["a.png", "b.png", "c.png"];
    const getImagesInDirectory = jest.fn().mockReturnValue(images);
    const randomImage = await getRandomImage({ getImagesInDirectory });
    expect(images).toContain(randomImage);
  });
});
