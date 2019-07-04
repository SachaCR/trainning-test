const myUnpureFunctionFactory = require('../myUnpureFunction.step2');

describe('myUnpureFunction() step 2', () => {

  describe('When called with 2 valid numbers', () => {
    const a = 5;
    const b = 5;
    const expectedValues = 10;

    describe('and rabbit MQ is up', () => {
      const rabbotMock = {
        publish: async () => {},
      };

      const myUnpureFunction = myUnpureFunctionFactory({ rabbot: rabbotMock });

      it('publish an event and return their sum', async () => {
        const result = await myUnpureFunction(a, b);
        expect(result).toStrictEqual(expectedValues);
      });
    });

    describe('and rabbit MQ throw an error', () => {
      const rabbotMock = {
        publish: async () => { throw new Error('RabbitMQ Error')},
      };

      const myUnpureFunction = myUnpureFunctionFactory({ rabbot: rabbotMock });

      it('throw an error', async () => {
        try {
          await myUnpureFunction(a, b);
        } catch (err) {
          error = err
        }

        expect(error.message).toStrictEqual('RabbitMQ Error');
      });
    });
  });

  describe('When called with invalid arguments', () => {
    const a = 'five';
    const b = 5;

    it('throw an error', async () => {
      const rabbotMock = {
        publish: async () => {},
      };

      const myUnpureFunction = myUnpureFunctionFactory({ rabbot: rabbotMock });

      let error;

      try {
        await myUnpureFunction(a, b);
      } catch (err) {
        error = err
      }

      expect(error.message).toStrictEqual('child \"a\" fails because [\"a\" must be a number]')
    });
  });
});