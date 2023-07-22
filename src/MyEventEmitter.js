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

    return this;
  }

  once(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args);

      this.off(eventName, onceListener);
    };

    this.on(eventName, onceListener);

    return this;
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (eventListener) => eventListener !== listener
      );
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach((listener) => listener(...args));

    return true;
  }
  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }
  prependOnceListener(eventName, listener) {
    const onceListener = (...args) => {
      listener(...args);

      this.off(eventName, onceListener);
    };

    this.prependListener(eventName, onceListener);

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }

    return this;
  }
  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = { MyEventEmitter };
