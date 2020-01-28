exports.createIdea = async ({ db, idea }) => {
  const results = await db
    .collection('ideas')
    .insertOne(idea);
  const createdIdea = results.ops[0];
  createdIdea.id = createdIdea._id;
  delete createdIdea._id;
  return createdIdea;
};
