exports.createScenarioHandlerFactory = ({
  createScenario,
  createScenarioInteractor
}) => {
  return async (req, res) => {
    const scenarios = await createScenarioInteractor({
      createScenario,
      scenario: req.body
    });
    res.send(scenarios);
  };
};
