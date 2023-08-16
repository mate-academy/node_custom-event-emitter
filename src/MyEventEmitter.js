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
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      );
    }
  }

  once(eventName, callback) {
    const callbackOnce = (...args) => {
      callback(...args);

      this.off(eventName, callbackOnce);
    };

    this.on(eventName, callbackOnce);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(...args));
    }
  }

  prependListener(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(callback);
  }

  prependOnceListener(eventName, callback) {
    const callbackOnce = (...args) => {
      callback(...args);

      this.off(eventName, callbackOnce);
    };

    this.prependListener(eventName, callbackOnce);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    return this.events[eventName]
      ? this.events[eventName].length
      : 0;
  }
}

module.exports = { MyEventEmitter };
