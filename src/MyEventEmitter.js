'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);

    return this;
  }

  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);

    return this;
  }

  off(event, callback) {
    const listeners = this.listeners[event];

    if (!listeners) {
      return this;
    }

    const index = listeners.indexOf(callback);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(event, ...args) {
    const callbacks = [...this.listeners[event]];

    if (!callbacks) {
      return;
    }

    for (const callback of callbacks) {
      callback.call(this, ...args);
    }
  }

  prependListener(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].unshift(callback);

    return this;
  }

  prependOnceListener(event, callback) {
    this.listeners[event] = this.listeners[event] || [];

    const prependWrapper = (...args) => {
      callback(...args);
      this.off(event, prependWrapper);
    };

    this.prependListener(event, prependWrapper);

    return this;
  }

  removeAllListeners() {
    this.listeners = {};
  }
  listenerCount(event) {
    const callbacks = this.listeners[event] || [];

    return callbacks.length;
  }
}

module.exports = {
  MyEventEmitter,
};
