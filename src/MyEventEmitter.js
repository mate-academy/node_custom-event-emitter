'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('listener must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);

    return this;
  }

  once(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('listener must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      callback(...args);
    };

    wrapper._original = callback; // ← вот так правильно

    this.listeners[eventName].push(wrapper);

    return this;
  }
  off(eventName, callback) {
    if (this.listeners[eventName]) {
      const index = this.listeners[eventName].findIndex(
        (fn) => fn === callback || fn._original === callback,
      );

      if (index !== -1) {
        this.listeners[eventName].splice(index, 1);
      }

      if (this.listeners[eventName].length === 0) {
        delete this.listeners[eventName];
      }
    }

    return this;
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return;
    }

    const listeners = this.listeners[eventName].slice();

    for (const event of listeners) {
      event(...args);
    }
  }
  prependListener(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('listener must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].unshift(callback);

    return this;
  }
  prependOnceListener(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('listener must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);

      return callback(...args);
    };

    wrapper._original = callback;

    this.listeners[eventName].unshift(wrapper);

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.listeners = {};
    } else if (this.listeners[eventName]) {
      delete this.listeners[eventName];
    }

    return this;
  }
  listenerCount(eventName) {
    if (this.listeners[eventName]) {
      return this.listeners[eventName].length;
    } else {
      return 0;
    }
  }
}

module.exports = MyEventEmitter;
