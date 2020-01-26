const {
  createIdeaHandlerFactory
} = require('./routes/createIdeaHandlerFactory');

exports.router = ({ app, db }) => {
  app.post(
    '/ideas',
    createIdeaHandlerFactory({
      db
    })
  );
};
