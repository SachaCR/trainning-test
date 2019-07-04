const Joi = require('@hapi/joi');

const sum = require('../sumNumber');

describe('When called with  two number', () => {
  it('should return their sum', () => {
    const result = sum(5, 5);
    expect(result).toStrictEqual(10);
  });
});
