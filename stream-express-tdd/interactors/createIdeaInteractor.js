exports.createIdeaInteractor = async ({
  db,
  createIdea,
  idea
}) => {
  const createdIdea = await createIdea({
    db,
    idea
  });
  return createdIdea;
};
