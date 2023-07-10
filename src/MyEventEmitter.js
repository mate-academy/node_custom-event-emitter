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
  }

  once(eventName, listener) {
    const onlyOnce = (...args) => {
      listener(...args);
      this.off(eventName, onlyOnce);
    };

    this.on(eventName, onlyOnce);
  }

  off(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName]
        .filter(event => event !== listener);
    }
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => {
        listener(...args);
      });
    }
  }

  prependListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const preOnlyOnce = (...args) => {
      listener(...args);
      this.off(eventName, preOnlyOnce);
    };

    this.prependListener(eventName, preOnlyOnce);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.listeners[eventName];
    } else {
      this.listeners = {};
    }
  }

  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }
}

module.exports = { MyEventEmitter };
