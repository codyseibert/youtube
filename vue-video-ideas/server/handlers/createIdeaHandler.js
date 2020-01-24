const { getClient } = require('../db');

exports.createIdeaHandler = async (req, res) => {
  const client = await getClient();
  const collection = client.collection('ideas');
  const result = await collection.insertOne({
    ...req.body,
    votes: 0
  });
  res.send(result.ops[0]);
};
