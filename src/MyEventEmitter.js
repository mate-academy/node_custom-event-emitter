'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push({ callback, isOnce: false });
  }

  once(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push({ callback, isOnce: true });
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener.callback !== callback,
      );
    }
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener.callback(...args);
      });

      this.listeners[event] = this.listeners[event].filter(
        (listener) => !listener.isOnce,
      );
    }
  }

  prependListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].unshift({ callback, isOnce: false });
  }

  prependOnceListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].unshift({ callback, isOnce: true });
  }

  removeAllListeners(event = null) {
    if (event === null) {
      this.listeners = {};
    } else if (this.listeners[event]) {
      this.listeners[event] = [];
    }
  }

  listenerCount(event) {
    return this.listeners[event] ? this.listeners[event].length : 0;
  }
}

module.exports = MyEventEmitter;
