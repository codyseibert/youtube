const { main } = require('./main');
const { argumentParser } = require('./argumentParser');

const {
  slashDelimitedString,
  isReplaceExisting,
  inputFilePath,
} = argumentParser({ args: process.argv.slice(2) });

main({
  slashDelimitedString,
  isReplaceExisting,
  inputFilePath,
});
