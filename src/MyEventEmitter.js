'use strict';

class MyEventEmitter {
  constructor() {
    this.prependListeners = {};
    this.commonListeners = {};
  }

  on(event, callback) {
    if (!this.commonListeners[event]) {
      this.commonListeners[event] = [];
    }

    this.commonListeners[event].push(callback);
  }

  once(event, callback) {
    if (!this.commonListeners[event]) {
      this.commonListeners[event] = [];
    }

    const onceWrapper = (...args) => {
      callback(...args);
      this.off(event, onceWrapper);
    };

    this.commonListeners[event].push(onceWrapper);
  }

  off(action, callback) {
    if (this.prependListeners[action]) {
      this.prependListeners[action] = this.prependListeners[action]
        .filter((listener) => listener !== callback);
    }

    if (this.commonListeners[action]) {
      this.commonListeners[action] = this.commonListeners[action]
        .filter((listener) => listener !== callback);
    }
  }

  emit(event, ...args) {
    if (this.prependListeners[event]) {
      this.prependListeners[event].forEach((callback, index) => {
        callback(...args);
      });
    }

    if (this.commonListeners[event]) {
      this.commonListeners[event].forEach((callback, index) => {
        callback(...args);
      });
    }
  }

  prependListener(event, callback) {
    if (!this.prependListeners[event]) {
      this.prependListeners[event] = [];
    }

    this.prependListeners[event].push(callback);
  }
  prependOnceListener(event, callback) {
    if (!this.prependListeners[event]) {
      this.prependListeners[event] = [];
    }

    const onceWrapper = (...args) => {
      callback(...args);
      this.off(event, onceWrapper);
    };

    this.prependListeners[event].push(onceWrapper);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.prependListeners[event];
      delete this.commonListeners[event];
    } else {
      this.prependListeners = {};
      this.commonListeners = {};
    }
  }

  listenerCount(event) {
    const prependListenersNumber = this.prependListeners[event]
      ? this.prependListeners[event].length
      : 0;
    const commonListenersNumber = this.commonListeners[event]
      ? this.commonListeners[event].length
      : 0;
    const sum = prependListenersNumber + commonListenersNumber;

    return sum;
  }
}

module.exports = {
  MyEventEmitter,
};
