'use strict';

function checkIfEmpty(name, listeners) {
  if (!listeners[name]) {
    listeners[name] = [];
  }
}

function checkArguments(name, callback) {
  if (
    (typeof name !== 'string' && typeof name !== 'symbol') ||
    typeof callback !== 'function'
  ) {
    throw new Error('Invalid arguments!');
  }
}

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(name, callback) {
    checkArguments(name, callback);
    checkIfEmpty(name, this.listeners);

    this.listeners[name].push(callback);

    return this;
  }

  once(name, callback) {
    checkArguments(name, callback);
    checkIfEmpty(name, this.listeners);

    const wrapper = (...args) => {
      callback(...args);
      this.off(name, wrapper);
    };

    wrapper.original = callback;
    this.listeners[name].push(wrapper);

    return this;
  }

  off(name, callback) {
    checkArguments(name, callback);
    checkIfEmpty(name, this.listeners);

    if (!this.listeners[name]) {
      return;
    }

    this.listeners[name] = this.listeners[name].filter(
      (x) => x !== callback && x.original !== callback,
    );

    return this;
  }

  emit(name, ...args) {
    checkArguments(name, () => {});

    const toCall = this.listeners[name]?.slice() || [];

    for (const listener of toCall) {
      listener(...args);
    }
  }

  prependListener(name, callback) {
    checkArguments(name, callback);
    checkIfEmpty(name, this.listeners);

    this.listeners[name].unshift(callback);

    return this;
  }

  prependOnceListener(name, callback) {
    checkArguments(name, callback);
    checkIfEmpty(name, this.listeners);

    const wrapper = (...args) => {
      callback(...args);
      this.off(name, wrapper);
    };

    wrapper.original = callback;
    this.listeners[name].unshift(wrapper);

    return this;
  }

  removeAllListeners(name) {
    if (typeof name === 'undefined') {
      this.listeners = {};
    } else {
      this.listeners[name] = [];
    }

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
