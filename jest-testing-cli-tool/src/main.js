const { readFileFromDisk } = require('./readFileFromDisk');
const { writeFileToDisk } = require('./writeFileToDisk');
const {
  slashDelimitedRegexReplacer,
} = require('./slashDelimitedRegexReplacer');

exports.main = async ({
  slashDelimitedString,
  isReplaceExisting,
  inputFilePath,
}) => {
  const fileText = await readFileFromDisk({
    path: inputFilePath,
  });

  const processedFileText = slashDelimitedRegexReplacer({
    slashDelimitedString,
    text: fileText,
  });

  if (isReplaceExisting) {
    await writeFileToDisk({
      path: inputFilePath,
      data: processedFileText,
    });
  } else {
    console.log(processedFileText);
  }
};
