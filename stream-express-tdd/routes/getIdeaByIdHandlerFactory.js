const {
  getIdeaByIdInteractor
} = require('../interactors/getIdeaByIdInteractor');
const {
  getIdeaById
} = require('../persistence/getIdeaById');

exports.getIdeaByIdHandlerFactory = ({ db }) => {
  return async (req, res) => {
    const idea = await getIdeaByIdInteractor({
      db,
      getIdeaById,
      ideaId: req.params.ideaId
    });

    res.send(idea);
  };
};
