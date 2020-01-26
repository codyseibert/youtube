const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'tdd-ideas';

const { router } = require('./router');

(async () => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  router({ app, db });

  app.listen(5000);
})();
