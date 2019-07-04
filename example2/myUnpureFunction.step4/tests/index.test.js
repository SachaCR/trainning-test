const myUnpureFunctionFactory = require('../index');

describe('myUnpureFunction() step 4', () => {

  describe('When called with 2 valid numbers and a date', () => {
    const a = 5;
    const b = 5;
    const date = new Date('2019-01-01');
    const expectedValues = 10;

    describe('and rabbit MQ is up', () => {
      it('publish an event and return their sum', async () => {
        let eventPublished = false;

        const rabbotMock = {
          publish: async (exchange, payload) => {
            expect(exchange).toStrictEqual('exchange');
            expect(payload).toStrictEqual({
              type: 'event.operation.addition',
              body: { a: 5, b: 5, timestamp: date },
            });

            eventPublished = true;
          },
        };

        const myUnpureFunction = myUnpureFunctionFactory({ rabbot: rabbotMock });
        const result = await myUnpureFunction(a, b, date);

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
          await myUnpureFunction(a, b, date);
        } catch (err) {
          error = err
        }

        expect(error.message).toStrictEqual('RabbitMQ Error');
      });
    });
  });

  describe('When called with invalid arguments and a date', () => {
    const a = 'five';
    const b = 5;
    const date = new Date('2019-01-01');

    it('throw an error', async () => {
      const rabbotMock = {
        publish: async () => {},
      };

      const myUnpureFunction = myUnpureFunctionFactory({ rabbot: rabbotMock });

      let error;

      try {
        await myUnpureFunction(a, b, date);
      } catch (err) {
        error = err
      }

      expect(error.message).toStrictEqual('child \"a\" fails because [\"a\" must be a number]')
    });
  });
});