const { Scenario } = require('../../models/scenario.js');

exports.createScenarioInteractor = async ({
  createScenario,
  scenario
}) => {
  const newScenario = await createScenario(scenario);
  const scenarioModel = new Scenario(newScenario);
  return scenarioModel;
};
