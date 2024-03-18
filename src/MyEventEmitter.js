'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, eventListener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(eventListener);
  }

  once(eventName, eventListener) {
    const listener = (args) => {
      eventListener(args);
      this.off(eventName, listener);
    };

    this.on(eventName, listener);
  }

  off(eventName, eventListener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (listener) => listener !== eventListener,
      );
    }
  }

  emit(eventName, ...args) {
    this.events[eventName].forEach((listener) => listener(...args));
  }

  prependListener(eventName, eventListener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(eventListener);
  }

  prependOnceListener(eventName, eventListener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const listener = (args) => {
      eventListener(args);
      this.off(eventName, listener);
    };

    this.events[eventName].unshift(listener);
  }

  removeAllListeners(eventName) {
    this.events[eventName] = [];
  }

  listenerCount(eventName) {
    if (this.events[eventName]) {
      return this.events[eventName].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
