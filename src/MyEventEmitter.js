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

    const oneTimeListener = (...args) => {
      listener(...args);
      this.off(eventName, oneTimeListener);
    };

    this.listeners[eventName].push(oneTimeListener);
  }
  off(eventName, listenerToRemove) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== listenerToRemove,
    );
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName].forEach((listener) => listener(...args));
  }
  prependListener(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    const oneTimeListener = (...args) => {
      listener(...args);
      this.off(eventName, oneTimeListener);
    };

    this.prependListener(eventName, oneTimeListener);

    return this;
  }
  removeAllListeners(eventName) {
    delete this.listeners[eventName];
  }
  listenerCount(eventName) {
    if (!this.listeners[eventName]) {
      return 0;
    }

    return this.listeners[eventName].length;
  }
}

module.exports = MyEventEmitter;
