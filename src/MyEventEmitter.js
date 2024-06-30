'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
  }

  once(event, listener) {
    const onceListener = (...args) => {
      this.off(event, onceListener);
      listener(...args);
    };

    this.on(event, onceListener);
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }
    this.events[event].forEach((listener) => listener(...args));

    return true;
  }

  prependListener(event, listener) {
    (this.events[event] || (this.events[event] = [])).unshift(listener);
  }

  prependOnceListener(event, listener) {
    const onceListener = (...args) => {
      this.off(event, onceListener);
      listener(...args);
    };

    this.prependListener(event, onceListener);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
