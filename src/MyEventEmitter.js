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
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const wrapper = (...args) => {
      listener(...args);

      this.off(eventName, wrapper);
    };

    this.listeners[eventName].push(wrapper);
  }
  off(eventName, listener) {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (l) => l !== listener,
    );
  }
  emit(eventName, ...args) {
    if (this.listeners[eventName] && this.listeners[eventName].length > 0) {
      this.listeners[eventName].forEach((l) => l(...args));
    }
  }
  prependListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const wrapper = (...args) => {
      listener(...args);

      this.off(eventName, wrapper);
    };

    this.listeners[eventName].unshift(wrapper);
  }
  removeAllListeners(eventName) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].length = 0;
    }
  }
  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
