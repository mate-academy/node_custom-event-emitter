'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);

    return this;
  }
  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    this.on(eventName, wrapper);

    return this;
  }
  off(eventName, listener) {
    this.events[eventName]
      = this.events[eventName].filter((item) => item !== listener);

    return this;
  }
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => {
        listener(...args);
      });
    }
  }
  prependListener(eventName, listener) {
    this.events[eventName] = [listener, ...this.events[eventName]];

    return this;
  }
  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    if (this.events[eventName]) {
      delete this.events[eventName];
    }
  }
  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
