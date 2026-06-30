'use strict';
class MyEventEmitter {
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
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    const wrapper = () => {
      callback();

      this.listeners[event] = this.listeners[event].filter(
        (fn) => fn !== wrapper,
      );
    };

    this.listeners[event].push(wrapper);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (fn) => fn !== callback,
      );
    }
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((fn) => fn(...args));
    }
  }

  prependListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].unshift(callback);
  }

  prependOnceListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    const wrapper = () => {
      callback();

      this.listeners[event] = this.listeners[event].filter(
        (fn) => fn !== wrapper,
      );
    };

    this.listeners[event].unshift(wrapper);
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this.listeners = {};
    }

    if (this.listeners[event]) {
      this.listeners[event] = [];
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
