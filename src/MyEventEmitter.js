'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(method, callback) {
    if (!this.events[method]) {
      this.events[method] = [];
    }

    this.events[method].push(callback);
  }
  once(method, callback) {
    const onceWrapper = (...args) => {
      this.off(method, onceWrapper);
      callback(args);
    };

    this.on(method, onceWrapper);
  }
  off(method, listenerName) {
    this.events[method] = this.events[method].filter(
      (listener) => listener !== listenerName,
    );
  }
  emit(method, ...args) {
    if (this.events[method]) {
      this.events[method].forEach((listener) => listener(...args));
    }
  }
  prependListener(method, callback) {
    if (!this.events[method]) {
      this.events[method] = [];
    }

    this.events[method].unshift(callback);
  }
  prependOnceListener(method, callback) {
    const onceWrapper = (...args) => {
      this.off(method, onceWrapper);
      callback(args);
    };

    this.prependListener(method, onceWrapper);
  }
  removeAllListeners(method) {
    if (!method) {
      this.events = {};
    }

    this.events[method] = [];
  }
  listenerCount(method) {
    if (!this.events[method]) {
      return 0;
    }

    return this.events[method].length;
  }
}

module.exports = MyEventEmitter;
