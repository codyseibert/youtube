const fs = require('fs');

exports.writeFileToDisk = async ({ path, data }) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, 'utf8', (err) =>
      err ? reject(err) : resolve()
    )
  );
