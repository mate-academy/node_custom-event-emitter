'use strict';

const myEventListener = class MyEventEmitter {
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
    if (this.events[eventName]) {
      this.events[eventName] = listener;
    }

    return this;
  }

  off(eventName, listener) {
    const index = this.events[eventName].indexof(listener);

    if (index >= 0) {
      this.events[eventName].splice(index, 1);
    }

    return this;
  }

  emit(eventName, [...args]) {
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
    const index = this.events[eventName].indexof(listener);

    if (index >= 0) {
      this.events[eventName].splice(index, 1);
    }

    this.events[eventName].unshift(listener);

    return this;
  }

  removeAllListeners(eventName) {
    delete this.events[eventName];

    return this;
  }

  listenerCount(eventName) {
    if (this.events[eventName]) {
      return this.events[eventName].length;
    }

    return 0;
  }
};

module.exports = { myEventListener };
