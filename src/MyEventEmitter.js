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
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }

  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener !== listenerToRemove,
    );
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach((listener) => {
      listener(...args);
    });
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
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
    if (!eventName) {
      this.events = {};

      return;
    }
    delete this.events[eventName];
  }

  // Returns the number of listeners for a given event.
  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
