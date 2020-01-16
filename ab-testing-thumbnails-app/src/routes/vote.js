const {
  voteOnThumbnail
} = require('../persistence/voteOnThumbnail');
const path = require('path');

const {
  getScenarios
} = require('../persistence/getScenarios');

exports.post = async (req, res) => {
  await voteOnThumbnail({
    scenarioId: req.params.scenarioId,
    username: req.session.username,
    thumbnail: req.body.thumbnail
  });
  res.send('success');
};

exports.get = async (req, res) => {
  const scenarios = await getScenarios();
  res.render('layout', {
    locals: {
      title: 'Vote',
      scenarios,
      session: req.session
    },
    partials: {
      content: path.join(__dirname, '../../views/vote.html')
    }
  });
};
