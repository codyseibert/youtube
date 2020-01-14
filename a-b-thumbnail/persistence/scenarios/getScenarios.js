const { getCollection } = require('../mongo.js');

exports.getScenarios = async () => {
  const collection = await getCollection('scenarios');
  const scenarios = await collection.find({}).toArray();
  return scenarios;
};
