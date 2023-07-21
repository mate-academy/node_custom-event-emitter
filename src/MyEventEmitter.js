'use strict';

module.exports = class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      callback, once: false,
    });
  }

  once(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      callback, once: true,
    });
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName]
        .filter(event => event.callback !== callback);
    }
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(event => {
        event.callback(...args);

        return !event.once;
      });
    }
  }

  prependListener(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({
      callback, once: false,
    });
  }

  prependOnceListener(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({
      callback, once: true,
    });
  }

  removeAllListeners(eventName) {
    if (this.events[eventName]) {
      this.events[eventName] = [];
    }
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
};
