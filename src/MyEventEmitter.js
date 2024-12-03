'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }

  off(event, listener) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      (fn) => fn !== listener,
    );
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => listener(...args));
  }

  prependListener(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].unshift(listener);
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
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }
  }

  listenerCount(event) {
    if (!this.listeners[event]) {
      return 0;
    }

    return this.listeners[event].length;
  }
}

module.exports = MyEventEmitter;
