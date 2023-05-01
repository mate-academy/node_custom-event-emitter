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
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceCallback = (...args) => {
      listener(args);
      this.off(eventName, onceCallback);
    };

    this.events[eventName].push(onceCallback);

    return this;
  }

  off(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName] = this.events[eventName].filter(
      (eventListener) => eventListener !== listener
    );

    return this;
  }

  emit(eventName, ...args) {
    this.event[eventName].forEach((listener) => listener(...args));

    return this;
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    const onceCallback = (...args) => {
      listener(args);
      this.off(eventName, onceCallback);
    };

    this.events[eventName].unshift(onceCallback);

    return this;
  }

  removeAllListeners(eventName) {
    if (!this.events[eventName]) {
      this.events = {};
    } else {
      this.events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
