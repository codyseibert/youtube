const {
  createIdeaHandlerFactory
} = require('./routes/createIdeaHandlerFactory');
const {
  getIdeaByIdHandlerFactory
} = require('./routes/getIdeaByIdHandlerFactory');

exports.router = ({ app, db }) => {
  app.post(
    '/ideas',
    createIdeaHandlerFactory({
      db
    })
  );

  app.get(
    '/ideas/:ideaId',
    getIdeaByIdHandlerFactory({
      db
    })
  );
};
