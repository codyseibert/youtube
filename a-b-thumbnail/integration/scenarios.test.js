const {
  createScenarioInteractor
} = require('../interactor/scenarios/createScenarioInteractor');
const {
  getScenariosInteractor
} = require('../interactor/scenarios/getScenariosInteractor');
const {
  createScenario
} = require('../persistence/scenarios/createScenario');
const {
  getScenarios
} = require('../persistence/scenarios/getScenarios');

const {
  getCollection,
  closeClient
} = require('../persistence/mongo');

describe('scenarios', () => {
  beforeEach(async () => {
    const collection = await getCollection('scenarios');
    await collection.remove();
  });

  afterEach(async () => {
    await closeClient();
  });

  it('should be able to create a scenario and then fetch it back', async () => {
    await createScenarioInteractor({
      createScenario,
      scenario: {
        title: 'what is up youtube',
        someOtherPropertyThatShouldBeStripped:
          'please strip this'
      }
    });

    const allScenarios = await getScenariosInteractor({
      getScenarios
    });

    expect(allScenarios).toEqual([
      { subjects: [], title: 'what is up youtube' }
    ]);
  });
});
