exports.outputProcessorFactory = ({
  isReplaceExisting = false,
  writeFile,
}) => async ({ outputText, path = null }) => {
  if (isReplaceExisting) {
    await writeFile({
      path,
      data: outputText,
    });
  } else {
    console.log(outputText);
  }
};
