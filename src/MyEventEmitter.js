'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  once(event, callback) {
    const newCallback = (...args) => {
      callback(...args);

      this.off(event, newCallback);
    };

    this.on(event, newCallback);
  }

  off(event, callback) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach((callback) => callback(...args));
  }

  prependListener(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(callback);
  }

  prependOnceListener(event, callback) {
    const newCallback = (...args) => {
      callback(...args);

      this.off(event, newCallback);
    };

    this.prependListener(event, newCallback);
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this.events = {};
    }

    delete this.events[event];
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }
}

module.exports = { MyEventEmitter };
