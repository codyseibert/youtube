exports.getIdeaByIdInteractor = async ({
  db,
  getIdeaById,
  ideaId
}) => {
  const idea = await getIdeaById({
    db,
    ideaId
  });
  return idea;
};
