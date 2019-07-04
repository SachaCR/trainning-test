const myUnpureFunctionFactory = require('../myUnpureFunction.step2');

describe('myUnpureFunction() step 2', () => {

  describe('When called with 2 valid numbers', () => {
    const a = 5;
    const b = 5;
    const expectedValues = 10;

    describe('and rabbit MQ is up', () => {
      it.skip('publish an event and return their sum', async () => {
        let eventPublished = false;

        const rabbotMock = {
          publish: async (exchange, payload) => {
            expect(exchange).toStrictEqual('exchange');
            expect(payload).toStrictEqual({
              type: 'event.operation.addition',
              body: { a: 5, b: 5, now: new Date() },
            });

            eventPublished = true;
          },
        };

        const myUnpureFunction = myUnpureFunctionFactory({ rabbot: rabbotMock });
        const result = await myUnpureFunction(a, b);

        expect(eventPublished).toStrictEqual(true);
        expect(result).toStrictEqual(expectedValues);
      });
    });

    describe('and rabbit MQ throw an error', () => {
      const rabbotMock = {
        publish: async () => {
          throw new Error('RabbitMQ Error')},
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