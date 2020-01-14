const Joi = require('joi');

exports.Scenario = class Scenario {
  constructor(scenario) {
    this.title = scenario.title;
    this.subjects = scenario.subjects || [];

    this.validate();
  }

  async validate() {
    const schema = Joi.object({
      title: Joi.string().required(),
      subjects: Joi.array().items(
        Joi.object().keys({
          image: Joi.string().required(),
          votes: Joi.number().required()
        })
      )
    });

    await schema.validate(this);
  }
};
