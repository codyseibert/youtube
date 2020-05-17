const fs = require('fs');

exports.readFileFromDisk = async ({ path }) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, 'utf8', (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );
