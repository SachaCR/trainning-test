const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  a: Joi.number().required(),
  b: Joi.number().required(),
});

function myPureFunction(a, b) {
  const result = schema.validate({ a, b });

  if (result.error) {
    throw result.error;
  }

  return a + b;
}

module.exports = myPureFunction;