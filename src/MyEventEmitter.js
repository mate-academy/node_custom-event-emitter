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
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(l => (
        l !== listener
      ));
    }
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => (
        listener(...args)
      ));
    }
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

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
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    return this.events[eventName]
      ? this.events[eventName].length
      : 0;
  }
}

module.exports = { MyEventEmitter };
