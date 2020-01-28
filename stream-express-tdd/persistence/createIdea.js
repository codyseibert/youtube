const { stripMongoDB } = require('./util');

exports.createIdea = async ({ db, idea }) => {
  const results = await db
    .collection('ideas')
    .insertOne(idea);
  const createdIdea = results.ops[0];
  return stripMongoDB(createdIdea);
};
