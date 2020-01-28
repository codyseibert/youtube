const { ObjectId } = require('mongodb');
const { stripMongoDB } = require('./util');

exports.getIdeaById = async ({ db, ideaId }) => {
  const idea = await db
    .collection('ideas')
    .findOne({ _id: ObjectId(ideaId) });
  return stripMongoDB(idea);
};
