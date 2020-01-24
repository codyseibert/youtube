const {
  getIdeasHandler
} = require('./handlers/getIdeasHandler');
const {
  upVoteIdeaHandler
} = require('./handlers/upVoteIdeaHandler');
const {
  downVoteIdeaHandler
} = require('./handlers/downVoteIdeaHandler');
const {
  createIdeaHandler
} = require('./handlers/createIdeaHandler');

exports.router = app => {
  app.get('/ideas', getIdeasHandler);
  app.post('/ideas/:ideaId/votes', upVoteIdeaHandler);
  app.delete('/ideas/:ideaId/votes', downVoteIdeaHandler);
  app.post('/ideas', createIdeaHandler);
};
