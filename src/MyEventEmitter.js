'use strict';

class MyEventEmitter {
  listeners = {};

  on(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }
  once(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      callback(...args);
    };

    onceWrapper._original = callback;

    this.listeners[eventName].push(onceWrapper);
  }
  off(eventName, callback) {
    if (!this.listeners[eventName]) {
      return;
    }

    const index = this.listeners[eventName].findIndex(
      (item) => item === callback || item._original === callback,
    );

    if (index !== -1) {

  prependListener(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].unshift(callback);
  }
  prependOnceListener(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      callback(...args);
    };

    onceWrapper._original = callback;

    this.listeners[eventName].unshift(onceWrapper);
  }
  removeAllListeners(eventName) {
    if (arguments.length === 0) {
      this.listeners = {};
    } else {
      this.listeners[eventName] = [];
    }
  }
  listenerCount(eventName) {
    return (this.listeners[eventName] || []).length;
  }
}

module.exports = MyEventEmitter;
