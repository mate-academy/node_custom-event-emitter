'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;
    this.on(eventName, wrapper);

    return this;
  }

  off(eventName, listener) {
    if (!this.listeners[eventName]) {
      return this;
    }

    this.listeners[eventName] = this.listeners[eventName].filter((l) => {
      return l !== listener && l.listener !== listener;
    });

    return this;
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return this;
    }

    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });

    return this;
  }

  prependListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;

    this.prependListener(eventName, wrapper);

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.listeners = {};
    } else {
      delete this.listeners[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    return this.listeners[eventName]?.length || 0;
  }
}

module.exports = MyEventEmitter;
