const { getClient } = require('../db');

exports.getIdeasHandler = async (req, res) => {
  const client = await getClient();
  const collection = client.collection('ideas');
  const ideas = await collection.find({}).toArray();
  res.send(ideas);
};
