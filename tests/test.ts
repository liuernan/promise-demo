import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import Promise from '../src/promise';

chai.use(sinonChai);

const assert = chai.assert;

/**
 * Promises/A+
 * An open standard for sound, interoperable JavaScript promises—by implementers, for implementers.
 * https://promisesaplus.com/
 *
 * 这是 MDN 官方文档中介绍 Promise 时指向的 Promises/A+ 规范的说明，JS 的 Promise 就是按照这个规范实现的
 * 所以我们也按照这个规范来写测试用例，一条条都满足，就搞定了
 * 加油
 **/

describe('Promise', () => {
  it('是一个类', () => {
    assert.isFunction(Promise);
    assert.isObject(Promise.prototype);
  });
});