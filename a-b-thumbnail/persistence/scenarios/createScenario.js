const { getCollection } = require('../mongo.js');

exports.createScenario = async scenario => {
  const collection = await getCollection('scenarios');
  const result = await collection.insert(scenario);
  return result.ops[0];
};
