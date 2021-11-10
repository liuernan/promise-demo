import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import Promise from '../src/promise';

chai.use(sinonChai);

const assert = chai.assert;

console.log(Promise);


describe('test environment', () => {
  it('init success', () => {
    const fn = sinon.fake();
    assert.equal(1, 1);
    fn();
    assert.equal(fn.callCount, 1);
  });
});