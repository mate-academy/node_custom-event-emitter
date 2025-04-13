'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(callback);

    return callback;
  }
  once(name, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(name, wrapper);
    };

    this.on(name, wrapper);

    return wrapper;
  }

  off(name, callback) {
    if (!this.listeners[name]) {
      return;
    }

    this.listeners[name] = this.listeners[name].filter((cb) => cb !== callback);

    if (this.listeners[name].length === 0) {
      delete this.listeners[name];
    }
  }

  emit(name, ...args) {
    if (this.listeners[name]) {
      const listeners = [...this.listeners[name]];

      for (const cb of listeners) {
        cb(...args);
      }
    }
  }
  prependListener(name, callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].unshift(callback);

    return callback;
  }
  prependOnceListener(name, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(name, wrapper);
    };

    this.prependListener(name, wrapper);

    return wrapper;
  }
  removeAllListeners(name, callback) {
    if (name) {
      delete this.listeners[name];
    } else {
      this.listeners = {};
    }
  }
  listenerCount(name) {
    return this.listeners[name]?.length || 0;
  }
}

module.exports = MyEventEmitter;
