const Joi = require('@hapi/joi');
const rabbot = require('rabbot');

const schema = Joi.object().keys({
  a: Joi.number().required(),
  b: Joi.number().required(),
});

async function myUnpureFunction(a, b) {
  const result = schema.validate({ a, b });

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

module.exports = myUnpureFunction;
