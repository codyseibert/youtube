exports.argumentParser = ({ args }) => {
  const inputFilePath = args[0];
  const slashDelimitedString = args[1];

  const isReplaceExisting =
    args.length > 2 ? args[2] === '-i' : false;

  return {
    slashDelimitedString,
    isReplaceExisting,
    inputFilePath,
  };
};
