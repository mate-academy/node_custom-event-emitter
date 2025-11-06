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

    return listener;
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
      (l) => l !== listener,
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

    return listener;
  }

  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);

      this.off(eventName, wrapper);
    };

    this.events[eventName].unshift(wrapper);
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events[eventName] = [];
    }

    delete this.events[eventName];
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
