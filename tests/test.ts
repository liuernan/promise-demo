import * as chai from 'chai';
import * as sinon from 'sinon';
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

  it('new Promise() 如果接受的不是一个函数就报错', () => {
    // assert.throw(fn) 的作用：如果 fn 报错，控制台就不报错。如果 fn 不报错，控制台就报错。
    assert.throw(() => {
      // @ts-ignore
      new Promise();
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise(1);
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise(false);
    });
  });

  it('new Promise(fn) 会生成一个对象，对象有 then 方法', () => {
    const promise = new Promise(() => {});
    // @ts-ignore
    assert.isFunction(promise.then);
  });

  it('new Promise(fn) 中的 fn 立即执行', () => {
    let fn = sinon.fake();
    new Promise(fn);
    assert(fn.called);
  });

  it('new Promise(fn) 中的 fn 执行的时候接受 resolve 和 reject 两个函数', done => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done();
    });
  });

  it('Promise 的初始状态是 pending', () => {
    const promise = new Promise(() => {

    });

    assert.strictEqual('pending', promise.state);
  });

  it('new Promise(fn) 中的 fn 执行的时候调用了 resolve，这个 Promise 的状态变成 fulfilled', (done) => {
    const promise = new Promise((resolve) => {
      resolve();
    });
    setTimeout(() => {
      assert.strictEqual('fulfilled', promise.state);
      done();
    }, 0);
  });

  it('new Promise(fn) 中的 fn 执行的时候调用了 reject，这个 Promise 的状态变成 rejected', (done) => {
    const promise = new Promise((resolve, reject) => {
      reject();
    });
    setTimeout(() => {
      assert.strictEqual('rejected', promise.state);
      done();
    }, 0);
  });

  it('new Promise(fn) 状态变成 fulfilled 就不能再改变，也就是不能再调用 reject 了', (done) => {
    const promise = new Promise((resolve, reject) => {
      resolve();
      reject();
    });
    setTimeout(() => {
      assert.strictEqual('fulfilled', promise.state);
      done();
    }, 0);
  });

  it('new Promise(fn) 状态变成 rejected 就不能再改变，也就是不能再调用 resolve 了', (done) => {
    const promise = new Promise((resolve, reject) => {
      reject();
      resolve();
    });
    setTimeout(() => {
      assert.strictEqual('rejected', promise.state);
      done();
    }, 0);
  });

  it('promise.then(success) 中的 success 会在且仅在 resolve 被调用之后执行', (done) => {
    const success = sinon.fake();
    const promise = new Promise((resolve) => {
      assert(success.notCalled);
      resolve();
      setTimeout(() => {
        assert(success.called);
        done();
      }, 0);
    });

    promise.then(success);
  });

  it('promise.then(null, fail) 中的 fail 会在且仅在 reject 被调用之后执行', (done) => {
    const fail = sinon.fake();
    const promise = new Promise((resolve, reject) => {
      assert(fail.notCalled);
      reject();
      setTimeout(() => {
        assert(fail.called);
        done();
      }, 0);
    });

    promise.then(null, fail);
  });

  it('promise.then(onFulfilled, onRejected) 中的 onFulfilled 和 onRejected 都是非必传', () => {
    const promise = new Promise((resolve) => {
      resolve();
    });

    promise.then();

    assert(1 === 1);
  });

  it('promise.then(onFulfilled, onRejected) 中的 onFulfilled 如果不是一个函数，就忽略', () => {
    const promise = new Promise((resolve) => {
      resolve();
    });

    promise.then(false);

    assert(1 === 1);
  });

  it('promise.then(onFulfilled, onRejected) 中的 onRejected 如果不是一个函数，就忽略', () => {
    const promise = new Promise((resolve, reject) => {
      reject();
    });

    promise.then(false, false);

    assert(1 === 1);
  });
});