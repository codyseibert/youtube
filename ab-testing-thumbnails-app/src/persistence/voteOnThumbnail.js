const { data, persist } = require('./data');

exports.voteOnThumbnail = ({
  scenarioId,
  thumbnail,
  username
}) => {
  const scenario = data.scenarios.find(
    scenario => scenario.id === scenarioId
  );
  if (scenario.votes.indexOf(username) !== -1) {
    throw new Error(
      'you can not vote twice on the same card'
    );
  }
  scenario.votes.push(username);
  let aVotes = scenario.aVotes || 0;
  let bVotes = scenario.bVotes || 0;
  if (thumbnail === 'a') {
    aVotes++;
    scenario.aVotes = aVotes;
  } else {
    bVotes++;
    scenario.bVotes = bVotes;
  }
  persist();
};
