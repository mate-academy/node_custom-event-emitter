'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    return this;
  }

  once(eventName, fn) {
    const executeOnce = (...args) => {
      fn(...args);
      this.off(eventName, executeOnce);
    };

    this.on(eventName, executeOnce);

    return this;
  }

  off(eventName, fn) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName]
        .filter(event => event !== fn);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => fn(...args));
    }

    return this;
  }

  prependListener(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(fn);

    return this;
  }

  prependOnceListener(eventName, fn) {
    const executeOnce = (...args) => {
      fn(...args);
      this.off(eventName, executeOnce);
    };

    this.events[eventName].unshift(executeOnce);

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
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = {
  MyEventEmitter,
};
