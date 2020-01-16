const fs = require('fs');

const data = JSON.parse(
  fs.readFileSync('./data.json', 'utf8')
);

exports.data = data;

exports.persist = () => {
  fs.writeFileSync(
    './data.json',
    JSON.stringify(data),
    'utf8'
  );
};
