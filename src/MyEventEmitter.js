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
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (i) => i !== listener,
    );
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    [...this.events[eventName]].forEach((listener) => {
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
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    this.prependListener(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.events = {};
    }

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
