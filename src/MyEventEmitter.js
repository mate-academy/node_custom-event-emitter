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
    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    this.on(eventName, onceListener);
  }
  off(eventName, listener) {
    this.events[eventName] = this.events[eventName].filter(
      (name) => name !== listener,
    );
  }
  emit(eventName, ...args) {
    this.events[eventName].forEach((callback) => callback(...args));
  }
  prependListener(eventName, listener) {
    this.events[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(eventName, onceListener);
    };

    this.prependListener(eventName, onceListener);
  }
  removeAllListeners(eventName) {
    this.events[eventName] = [];
  }
  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
