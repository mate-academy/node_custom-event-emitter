'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    const deleteItself = (...args) => {
      listener(...args);

      this.off(eventName, deleteItself);
    };

    this.on(eventName, deleteItself);
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (l) => l !== listener,
    );
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach((listener) => listener(...args));
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const deleteItself = (...args) => {
      listener(...args);

      this.off(eventName, deleteItself);
    };

    this.prependListener(eventName, deleteItself);
  }

  removeAllListeners(eventName) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = [];
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
