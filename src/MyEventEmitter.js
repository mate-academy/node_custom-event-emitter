'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return this;
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      );
    }

    return this;
  }

  once(eventName, callback) {
    const callbackOnce = (...args) => {
      callback(...args);

      this.off(eventName, callbackOnce);
    };

    this.on(eventName, callbackOnce);

    return this;
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(...args));
    }

    return this;
  }

  prependListener(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(callback);

    return this;
  }

  prependOnceListener(eventName, callback) {
    const callbackOnce = (...args) => {
      callback(...args);

      this.off(eventName, callbackOnce);
    };

    this.prependListener(eventName, callbackOnce);

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    return this.events[eventName]
      ? this.events[eventName].length
      : 0;
  }
}

module.exports = { MyEventEmitter };
