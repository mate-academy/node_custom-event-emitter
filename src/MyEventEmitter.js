'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(callback);
  }

  once(name, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(name, onceCallback);
    };

    this.on(name, onceCallback);
  }

  off(name, callback) {
    if (!this.events[name]) {
      return;
    }

    this.events[name] = this.events[name].filter(
      (eventCallback) => eventCallback !== callback,
    );
  }

  emit(name, ...args) {
    if (!this.events[name]) {
      return;
    }

    this.events[name].forEach((callback) => callback(...args));
  }

  prependListener(name, callback) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].unshift(callback);
  }

  prependOnceListener(name, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(name, onceCallback);
    };

    this.prependListener(name, onceCallback);
  }

  removeAllListeners(name) {
    if (name) {
      delete this.events[name];
    } else {
      this.events = {};
    }
  }

  listenerCount(name) {
    return this.events[name] ? this.events[name].length : 0;
  }
}

module.exports = MyEventEmitter;
