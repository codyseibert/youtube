const fs = require('fs');

exports.readFileFromDisk = async ({ path }) =>
  Promise.resolve(fs.readFileSync(path, 'utf8'));
