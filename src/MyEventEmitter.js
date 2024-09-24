'use strict';

class MyEventEmitter {
  listeners = {};

  on(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(callback);
    } else {
      this.listeners[eventName] = [callback];
    }
  }

  once(eventName, callback) {
    callback.once = true;

    if (this.listeners[eventName]) {
      this.listeners[eventName].push(callback);
    } else {
      this.listeners[eventName] = [callback];
    }
  }

  off(eventName, callback) {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (el) => el !== callback,
    );
  }

  emit(eventName, ...args) {
    for (const callback of this.listeners[eventName]) {
      callback(...args);
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (callback) => !callback.once,
    );
  }

  prependListener(eventName, callback) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].unshift(callback);
    } else {
      this.listeners[eventName] = [callback];
    }
  }

  prependOnceListener(eventName, callback) {
    callback.once = true;

    if (this.listeners[eventName]) {
      this.listeners[eventName].unshift(callback);
    } else {
      this.listeners[eventName] = [callback];
    }
  }

  removeAllListeners(eventName) {
    if (eventName) {
      this.listeners[eventName] = [];
    } else {
      this.listeners = {};
    }
  }

  listenerCount(eventName) {
    return this.listeners[eventName]?.length || 0;
  }
}

module.exports = MyEventEmitter;
