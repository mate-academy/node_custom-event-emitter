'use strict';

function checkIfEmpty(name, listeners) {
  if (!listeners[name]) {
    listeners[name] = [];
  }
}

function checkArguments(name, callback) {
  if (typeof name !== 'string' || typeof callback !== 'function') {
    throw new Error('Invalid arguments!');
  }
}

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(name, callback) {
    checkIfEmpty(name, this.listeners);
    checkArguments(name, callback);

    this.listeners[name].push(callback);

    return this;
  }

  once(name, callback) {
    checkIfEmpty(name, this.listeners);
    checkArguments(name, callback);

    const wrapper = (...args) => {
      callback(...args);
      this.off(name, wrapper);
    };

    this.listeners[name].push(wrapper);

    return this;
  }

  off(name, callback) {
    checkIfEmpty(name, this.listeners);
    checkArguments(name, callback);
    this.listeners[name] = this.listeners[name].filter((x) => x !== callback);

    return this;
  }

  emit(name, ...args) {
    checkArguments(name, () => {});

    if (!this.listeners[name]) {
      return;
    }

    for (const listener of this.listeners[name]) {
      listener(...args);
    }
  }

  prependListener(name, callback) {
    checkIfEmpty(name, this.listeners);
    checkArguments(name, callback);

    this.listeners[name].unshift(callback);
  }

  prependOnceListener(name, callback) {
    checkIfEmpty(name, this.listeners);
    checkArguments(name, callback);

    const wrapper = (...args) => {
      callback(...args);
      this.off(name, wrapper);
    };

    this.listeners[name].unshift(wrapper);

    return this;
  }

  removeAllListeners(name) {
    this.listeners[name] = [];

    return this;
  }

  listenerCount(name) {
    if (this.listeners[name] && this.listeners[name].length > 0) {
      return this.listeners[name].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
