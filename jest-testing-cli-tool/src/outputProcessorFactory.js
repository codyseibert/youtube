exports.outputProcessorFactory = ({
  isReplaceExisting = false,
  writeFileToDisk,
}) => async ({ outputText, path = null }) => {
  if (isReplaceExisting) {
    await writeFileToDisk({
      path,
      data: outputText,
    });
  } else {
    console.log(outputText);
  }
};
