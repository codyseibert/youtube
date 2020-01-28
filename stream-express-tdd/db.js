const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'tdd-ideas';

exports.getDatabaseConnection = () =>
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(client => client.db(dbName));
