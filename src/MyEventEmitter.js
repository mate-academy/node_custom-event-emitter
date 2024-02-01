'use strict';

class MyEventEmitter {
  constructor() {
    this.obj = {};
  }
  on(operation, callback) {
    this.obj.hasOwnProperty(operation)
      ? this.obj[operation].push(callback)
      : this.obj[operation] = [callback];
  }
  once(operation, callback) {
    const onceWrapper = (...args) => {
      callback(...args);

      this.off(operation, onceWrapper);
    };

    this.on(operation, onceWrapper);
  }
  off(operation, callback) {
    for (let i = 0; i < this.obj[operation].length; i++) {
      if (callback === this.obj[operation][i]) {
        this.obj[operation]
          = [...this.obj[operation].slice(0, i),
            ...this.obj[operation].slice(i + 1, this.obj[operation].length)];

        return;
      }
    }
  }
  emit(operation, ...args) {
    this.obj[operation].forEach(callback => callback(...args));
  }
  prependListener(operation, callback) {
    this.obj.hasOwnProperty(operation)
      ? this.obj[operation] = [callback, ...this.obj[operation]]
      : this.obj[operation] = [callback];
  }
  prependOnceListener(operation, callback) {
    const onceWrapper = (...args) => {
      callback(...args);

      this.off(operation, onceWrapper);
    };

    this.prependListener(operation, onceWrapper);
  }
  removeAllListeners(operation) {
    this.obj[operation] = [];
  }
  listenerCount(operation) {
    return this.obj.hasOwnProperty(operation)
      ? this.obj[operation].length
      : 0;
  }
}

module.exports = MyEventEmitter;
