interface thumbnailMoverArgs {
  fileMover: Function;
  imageId: string;
  isGood: boolean;
}

export const thumbnailMover = async (options: thumbnailMoverArgs) => {
  const sourceImageLocation = `./images/backlog/${options.imageId}`;
  const rating = options.isGood ? "good" : "bad";
  const destinationLocation = `./images/${rating}/${options.imageId}`;
  await options.fileMover(sourceImageLocation, destinationLocation);
};
