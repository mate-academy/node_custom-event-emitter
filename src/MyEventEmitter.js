'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(listener);

    return this;
  }
  once(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const wrapper = (...args) => {
      listener.apply(this, args);

      this.off(eventName, wrapper);
    };

    wrapper._original = listener;

    this.on(eventName, wrapper);

    return this;
  }
  off(eventName, listener) {
    if (!this.listeners[eventName]) {
      return this;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listen) => listen !== listener && listen._original !== listener,
    );

    if (this.listeners[eventName].length === 0) {
      delete this.listeners[eventName];
    }

    return this;
  }
  emit(eventName, ...args) {
    const list = this.listeners[eventName];

    if (!list || list.length === 0) {
      return false;
    }

    for (const fn of list.slice()) {
      fn(...args);
    }

    return true;
  }
  prependListener(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].unshift(listener);

    return this;
  }
  prependOnceListener(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const wrapper = (...args) => {
      listener.apply(this, args);

      this.off(eventName, wrapper);
    };

    wrapper._original = listener;

    this.prependListener(eventName, wrapper);

    return this;
  }
  removeAllListeners(eventName) {
    if (typeof eventName === 'undefined') {
      this.listeners = {};
    } else {
      delete this.listeners[eventName];
    }

    return this;
  }
  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
