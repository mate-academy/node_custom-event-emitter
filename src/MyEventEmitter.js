'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }

  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((listener) => listener(...args));
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(listener);
  }

  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.prependListener(event, wrapper);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }
}

module.exports = MyEventEmitter;
