const {
  createIdeaInteractor
} = require('../interactors/createIdeaInteractor');
const { createIdea } = require('../persistence/createIdea');

exports.createIdeaHandlerFactory = ({ db }) => {
  return async (req, res) => {
    const createdIdea = await createIdeaInteractor({
      db,
      createIdea,
      idea: req.body
    });

    res.send(createdIdea);
  };
};
