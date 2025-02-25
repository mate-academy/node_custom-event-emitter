'use strict';

class MyEventEmitter {
  eventNames = [];
  listeners = [];

  on(eventName, callback) {
    const isEvent = this.listeners[eventName];

    if (!isEvent) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }
  once(eventName, callback) {
    const oneCallback = (...args) => {
      this.off(eventName, oneCallback);
      callback(...args);
    };

    this.on(eventName, oneCallback);
  }
  off(eventName, callback) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (c) => c !== callback,
    );

    if (this.listeners[eventName].length === 0) {
      delete this.listeners[eventName];
    }
  }
  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((c) => c(...args));
    }
  }
  prependListener(eventName, callback) {
    this.listeners[eventName] = [callback, ...this.listeners[eventName]];
  }
  prependOnceListener(eventName, callback) {
    const oneCallback = (...args) => {
      this.off(eventName, oneCallback);
      callback(...args);
    };

    this.prependListener(eventName, oneCallback);
  }
  removeAllListeners(eventName = '') {
    if (eventName) {
      this.listeners[eventName] = [];
    } else {
      this.listeners = {};
    }
  }
  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
