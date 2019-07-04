const myPureFunction = require('../myPureFunction.step1');

describe('myPureFunction() step 3', ()=> {

  describe('When called with 2 valid numbers', ()=> {
    const a = 5;
    const b = 5;
    const expectedValues = 10;

    it('return their sum', ()=> {
      const result = myPureFunction(a, b);
      expect(result).toStrictEqual(expectedValues);
    });
  });

  describe('When called with invalid arguments', ()=> {
    const a = 'five';
    const b = 5;

    it('throw an error', ()=> {
      let error;

      try {
        myPureFunction(a, b);
      } catch(err) {
        error = err
      }

      expect(error.message).toStrictEqual('child \"a\" fails because [\"a\" must be a number]')
    });
  });

});