/* eslint-disable max-len */
'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  checkEventName = (eventName) => {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
  };

  on(eventName, listener) {
    this.checkEventName(eventName);
    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    const onceListener = (...args) => {
      this.off(eventName, onceListener);
      listener(...args);
    };

    this.on(eventName, onceListener);
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (registeredListener) => registeredListener !== listener,
      );
    }
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => {
        listener(...args);
      });
    }
  }

  prependListener(eventName, listener) {
    this.checkEventName(eventName);
    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const onceListener = (...args) => {
      this.off(eventName, onceListener);
      listener(...args);
    };

    this.prependListener(eventName, onceListener);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
