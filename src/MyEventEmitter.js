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
  }

  once(eventName, listener) {
    const onceFn = (...args) => {
      listener(...args);
      this.off(eventName, onceFn);
    };

    this.on(eventName, onceFn);
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName]
        .filter((e) => e !== listener);
    }
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      for (const listener of this.events[eventName]) {
        listener(...args);
      }
    }
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const onceFn = (...args) => {
      listener(...args);
      this.off(eventName, onceFn);
    };

    this.prependListener(eventName, onceFn);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = { MyEventEmitter };
