'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!Object.hasOwn(this.events, eventName)) {
      this.events[eventName] = [];
    }

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
    if (!Object.hasOwn(this.events, eventName)) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (l) => l !== listener,
    );

    if (!this.events[eventName].length) {
      delete this.events[eventName];
    }
  }

  emit(eventName, ...args) {
    if (!Object.hasOwn(this.events, eventName)) {
      return;
    }

    this.events[eventName].forEach((listener) => listener(...args));
  }

  prependListener(eventName, listener) {
    if (!Object.hasOwn(this.events, eventName)) {
      this.events[eventName] = [];
    }

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
    if (!eventName) {
      this.events = {};
    }

    delete this.events[eventName];
  }

  listenerCount(eventName) {
    return Object.hasOwn(this.events, eventName)
      ? this.events[eventName].length
      : 0;
  }
}

module.exports = MyEventEmitter;
