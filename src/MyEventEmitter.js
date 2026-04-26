'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(listener);
  }

  once(name, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(name, onceListener);
    };

    this.on(name, onceListener);
  }

  off(name, listener) {
    if (this.listeners[name]) {
      this.listeners[name] = this.listeners[name].filter((l) => l !== listener);
    }
  }

  emit(name, ...args) {
    if (this.listeners[name]) {
      this.listeners[name].forEach((listener) => listener(...args));
    }
  }

  prependListener(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].unshift(listener);
  }
  prependOnceListener(name, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(name, onceListener);
    };

    this.prependListener(name, onceListener);
  }
  removeAllListeners(name = undefined) {
    if (name === undefined) {
      this.listeners = {};
    } else {
      delete this.listeners[name];
    }
  }
  listenerCount(name) {
    return this.listeners[name] ? this.listeners[name].length : 0;
  }
}

module.exports = MyEventEmitter;
