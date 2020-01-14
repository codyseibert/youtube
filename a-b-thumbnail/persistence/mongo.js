const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost';
const dbName = 'ab-testing';

let client = null;

exports.closeClient = async () => {
  await client.close(true);
  client = null;
};

exports.getCollection = async collection => {
  if (!client) {
    client = await MongoClient.connect(url);
  }
  const db = await client.db(dbName);
  return db.collection(collection);
};
