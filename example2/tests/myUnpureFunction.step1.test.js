const myUnpureFunction = require('../myUnpureFunction.step1');

describe('myUnpureFunction() step 1', () => {

  describe('When called with 2 valid numbers', () => {
    const a = 5;
    const b = 5;
    const expectedValues = 10;

    it.skip('return their sum', async () => {
      const result = await myUnpureFunction(a, b);
      expect(result).toStrictEqual(expectedValues);
    });
  });

  describe('When called with invalid arguments', () => {
    const a = 'five';
    const b = 5;

    it.skip('throw an error', async () => {
      let error;

      try {
        await myUnpureFunction(a, b);
      } catch(err) {
        error = err
      }

      expect(error.message).toStrictEqual('child \"a\" fails because [\"a\" must be a number]')
    });
  });
});