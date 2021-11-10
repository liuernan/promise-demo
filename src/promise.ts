class myPromise {
  callbacks = [];

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Promise must have a function as argument');
    }

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve() {
    setTimeout(() => {
      this.callbacks.forEach((handler) => {
        handler[0].call();
      });
    }, 0);
  }

  reject() {
    setTimeout(() => {
      this.callbacks.forEach((handler) => {
        handler[1].call();
      });
    }, 0);
  }

  then(resolveHandler?, rejectedHandler?) {
    const handler = [null, null];
    handler[0] = resolveHandler;
    handler[1] = rejectedHandler;
    this.callbacks.push(handler);
  }
}

export default myPromise;