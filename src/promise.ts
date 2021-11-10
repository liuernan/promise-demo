class myPromise {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Promise must have a function as argument');
    }
    fn()
  }
}

export default myPromise;