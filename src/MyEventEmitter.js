'use strict';

class MyEventEmitter {
  listeners = {};
  on(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }
  once(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const subscribe = (...args) => {
      callback(...args);
      this.off(eventName, subscribe);
    };

    this.listeners[eventName].push(subscribe);
  }
  off(eventName, listenerToRemove) {
    if (!this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listener) => listener !== listenerToRemove,
    );
  }

  emit(evenName, ...args) {
    if (!this.listeners[evenName]) {
      return;
    }

    return this.listeners[evenName].forEach((callback) => {
      callback(...args);
    });
  }
  prependListener(evenName, callback) {
    if (!this.listeners[evenName]) {
      this.listeners[evenName] = [];
    }

    this.listeners[evenName].unshift(callback);
  }
  prependOnceListener(eventName, callback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const subscribe = (...args) => {
      callback(...args);
      this.off(eventName, subscribe);
    };

    this.listeners[eventName].unshift(subscribe);
  }
  removeAllListeners(evenName) {
    if (!this.listeners[evenName]) {
      return;
    }

    delete this.listeners[evenName];
  }
  listenerCount(evenName) {
    return this.listeners[evenName] ? this.listeners[evenName].length : 0;
  }
}

module.exports = MyEventEmitter;
