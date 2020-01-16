const { data, persist } = require('./data');

exports.createScenario = async scenario => {
  data.scenarios.push(scenario);
  persist();
};
