const {
  createIdeaInteractor
} = require('../interactors/createIdeaInteractor');

exports.createIdeaHandlerFactory = ({ db }) => {
  return async (req, res) => {
    console.log(req.body);
    await createIdeaInteractor({ db });
    res.send('testing');
  };
};
