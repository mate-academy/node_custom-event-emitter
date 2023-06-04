'use strict';

module.export = class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter((cb) => (
      cb !== callback));
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        callback(...args);
      });
    }
  }

  prependListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].unshift(callback);
  }

  prependOnceListener(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };

    this.prependListener(event, wrapper);
  }

  removeAllListeners(event) {
    if (!event) {
      this.listeners = {};
    }

    delete this.listeners[event];
  }

  listenerCount(event) {
    return this.listeners[event] ? this.listeners[event].length : 0;
  }
};
