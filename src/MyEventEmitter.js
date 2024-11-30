'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }

  off(eventName, listener) {
    this.events[eventName] = this.events[eventName].filter(
      (name) => name !== listener,
    );
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach((listener) => listener(...args));
  }

  prependListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };

    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    this.events[eventName] = [];
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
