exports.getScenariosHandlerFactory = ({
  getScenarios,
  getScenariosInteractor
}) => {
  return async (req, res) => {
    const scenarios = await getScenariosInteractor({
      getScenarios,
      scenario: req.body
    });
    res.send(scenarios);
  };
};
