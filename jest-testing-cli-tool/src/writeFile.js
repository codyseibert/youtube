const fs = require('fs');

exports.writeFile = async ({ path, file }) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, file, 'utf8', (err) =>
      err ? reject(err) : resolve()
    )
  );
