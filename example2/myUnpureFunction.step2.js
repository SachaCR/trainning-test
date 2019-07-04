const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  a: Joi.number().required(),
  b: Joi.number().required(),
});

function injectDeps(dependencies) {
  const { rabbot } = dependencies;

  async function myUnpureFunction(a, b) {
    const result = schema.validate({a, b});

    if (result.error) {
      throw result.error;
    }

    await rabbot.publish('exchange', {
      type: 'event.operation.addition',
      body: {
        a,
        b,
        timestamp: new Date(),
      }
    });

    return a + b;
  }

  return myUnpureFunction;
}

module.exports = injectDeps;
