const Joi = require('@hapi/joi');

const validate = require('../validation');

describe('Given a Joi schema', () => {
  const schema = Joi.object().keys({
    a: Joi.number().required(),
    b: Joi.number().required(),
  });

  describe('When called with a valid payload', () => {
    it('should return values', () => {
      const result = validate({ a: 5, b: 5 }, schema);
      expect(result).toStrictEqual({ a: 5, b: 5 });
    });
  });

  describe('When called with an invalid payload', () => {
    it('should not throw an error', () => {

      let error;

      try {
        validate({ a: 'five', b: 5 }, schema);
      } catch (err) {
        error = err;
      }

      expect(error.message).toStrictEqual('child \"a\" fails because [\"a\" must be a number]');
      expect(error.code).toStrictEqual('VALIDATION_ERROR');
    });
  });
});
