'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(callback);
  }

  off(name, callback) {
    if (this.events[name]) {
      this.events[name] = this.events[name].filter((cb) => cb !== callback);
    }
  }

  once(name, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(name, wrapper);
    };

    this.on(name, wrapper);
  }

  emit(name, ...args) {
    if (this.events[name]) {
      this.events[name].forEach((callback) => callback(...args));
    }
  }

  prependListener(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].unshift(callback);
  }

  prependOnceListener(name, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(name, wrapper);
    };

    this.prependListener(name, wrapper);
  }

  removeAllListeners(name) {
    if (name) {
      delete this.events[name];
    } else {
      this.events = {};
    }
  }

  listenerCount(name) {
    return this.events[name] ? this.events[name].length : 0;
  }
}

module.exports = MyEventEmitter;
