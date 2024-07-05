'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      callback,
      shouldBeInvokedOnce: false,
    });
  }

  once(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      callback,
      shouldBeInvokedOnce: true,
    });
  }

  off(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener.callback !== callback,
    );
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((listener) => {
        listener.callback(...args);

        return !listener.shouldBeInvokedOnce;
      });
    }
  }

  prependListener(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({
      callback,
      shouldBeInvokedOnce: false,
    });
  }

  prependOnceListener(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({
      callback,
      shouldBeInvokedOnce: true,
    });
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    return this.events[eventName]?.length || 0;
  }
}

module.exports = MyEventEmitter;
