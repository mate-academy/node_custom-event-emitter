'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);

    return this;
  }

  once(event, listener) {
    const onceListener = (...args) => {
      this.off(event, onceListener);
      listener(...args);
    }

    this.on(event, onceListener);

    return this;
  }

  off(event, listener) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event]
        .filter(fn => fn !== listener);
    }

    if (this.listeners[event].length === 0) {
      delete this.listeners[event];
    }

    return this;
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(...args));
    }

    return this;
  }

  prependListener(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    const onceListener = (...args) => {
      this.off(event, onceListener);
      listener(...args);
    }

    this.prependListener(event, onceListener);

    return this;
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.listeners = {};
    }

    return this;
  }

  listenerCount(event) {
    if (this.listeners[event]) {
      return this.listeners[event].length;
    }

    return 0;
  }
}

module.exports = { MyEventEmitter };
