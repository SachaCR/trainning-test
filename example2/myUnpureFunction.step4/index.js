const Joi = require('@hapi/joi');

const validate = require('./validation');
const sum = require('./sumNumber');

const schema = Joi.object().keys({
  a: Joi.number().required(),
  b: Joi.number().required(),
  now: Joi.date().required(),
});

function injectDeps(dependencies) {
  const { rabbot } = dependencies;

  async function myUnpureFunction(a, b, now) {

    validate({ a, b, now }, schema);

    await rabbot.publish('exchange', {
      type: 'event.operation.addition',
      body: {
        a,
        b,
        timestamp: now,
      }
    });

    return sum(a, b);
  }

  return myUnpureFunction;
}

module.exports = injectDeps;
