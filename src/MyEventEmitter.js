'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(listener);

    return this;
  }
  once(eventName, listener) {
    const wrapper = function (...args) {
      listener.apply(this, args);

      this.off(eventName, wrapper);
    }.bind(this);

    this.on(eventName, wrapper);

    return this;
  }
  off(eventName, listener) {
    if (!this.listeners[eventName]) {
      return this;
    }

    this.listeners[eventName] = this.listeners[eventName].filter(
      (listen) => listen !== listener,
    );

    return this;
  }
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return false;
    }

    this.listeners[eventName].forEach((func) => func(...args));

    return true;
  }
  prependListener(eventName, listener) {
    this.listeners[eventName] = [listener, ...this.listeners[eventName]];

    return this;
  }
  prependOnceListener(eventName, listener) {
    const wrapper = function (...args) {
      listener.apply(this, args);

      this.off(eventName, wrapper);
    }.bind(this);

    this.prependListener(eventName, wrapper);

    return this;
  }
  removeAllListeners(eventName) {
    if (typeof eventName === 'undefined') {
      this.listeners = {};
    } else {
      delete this.listeners[eventName];
    }
  }
  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
