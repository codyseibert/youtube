const { Scenario } = require('../../models/scenario.js');

exports.getScenariosInteractor = async ({
  getScenarios
}) => {
  const scenarios = await getScenarios();
  const scenarioModels = scenarios.map(
    scenario => new Scenario(scenario)
  );
  return scenarioModels;
};
