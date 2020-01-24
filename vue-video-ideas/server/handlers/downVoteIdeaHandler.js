const { getClient } = require('../db');
const ObjectId = require('mongodb').ObjectId;

exports.downVoteIdeaHandler = async (req, res) => {
  const { ideaId } = req.params;
  const client = await getClient();
  const collection = client.collection('ideas');
  const idea = await collection.findOne({
    _id: new ObjectId(ideaId)
  });
  idea.votes = (idea.votes || 0) - 1;
  await collection.updateOne(
    {
      _id: new ObjectId(ideaId)
    },
    { $set: idea }
  );
  res.send(idea);
};
