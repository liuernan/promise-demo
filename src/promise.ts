class myPromise {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Promise must have a function as argument');
    }

    const resolve = () => {};
    const reject = () => {};

    fn(resolve, reject);
  }

  then() {}
}

export default myPromise;