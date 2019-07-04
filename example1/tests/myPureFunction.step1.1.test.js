const myPureFunction = require('../myPureFunction.step1');

describe('myPureFunction() step 2', ()=> {

  describe('When called with 2 valid numbers', ()=> {
    const a = 5;
    const b = 5;
    const expectedValues = 10;

    it('return their sum', ()=> {
      const result = myPureFunction(a, b);
      expect(result).toStrictEqual(expectedValues);
    });
  });

  describe('When called with a string and a number', ()=> {
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

  describe('When called with a number and a string', ()=> {
    const a = 5;
    const b = 'five';

    it('throw an error', ()=> {
      let error;

      try {
        myPureFunction(a, b);
      } catch(err) {
        error = err
      }

      expect(error.message).toStrictEqual('child \"b\" fails because [\"b\" must be a number]')
    });
  });

  describe('When called with 2 strings', ()=> {
    const a = 'five';
    const b = 'five';

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