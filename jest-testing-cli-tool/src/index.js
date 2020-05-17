const { readFileFromDisk } = require('./readFileFromDisk');
const { writeFileToDisk } = require('./writeFileToDisk');
const {
  slashDelimitedRegexReplacer,
} = require('./slashDelimitedRegexReplacer');
const { argumentParser } = require('./argumentParser');
const {
  outputProcessorFactory,
} = require('./outputProcessorFactory');

(async () => {
  const {
    slashDelimitedString,
    isReplaceExisting,
    inputFilePath,
  } = argumentParser({ args: process.argv.slice(2) });

  const fileText = await readFileFromDisk({
    path: inputFilePath,
  });

  const processedFileText = slashDelimitedRegexReplacer({
    slashDelimitedString,
    text: fileText,
  });

  await outputProcessorFactory({
    isReplaceExisting,
    writeFileToDisk,
  })({
    path: inputFilePath,
    outputText: processedFileText,
  });
})();
