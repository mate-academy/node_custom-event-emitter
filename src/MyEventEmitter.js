'use strict';

module.exports = class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);

    return this;
  }

  once(event, listener) {
    const newListener = (...args) => {
      listener(...args);
      this.off(event, listener);
    };

    this.on(event, newListener);

    return this;
  }

  off(event, listenerToDelete) {
    if (!this.listeners[event]) {
      throw new Error('Event does not exist');
    }

    this.listeners[event].filter(listener => listener !== listenerToDelete);

    if (!this.listeners[event].length) {
      delete this.listeners[event];
    }

    return this;
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Error('Event does not exist');
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });

    return this;
  }

  prependListener(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    const newListener = (...args) => {
      listener(...args);
      this.off(event, listener);
    };

    this.prependListener(event, newListener);

    return this;
  }

  removeAllListeners(event) {
    if (event) {
      delete this.listeners[event];
    } else {
      this.listeners = {};
    }

    return this;
  }

  listenerCount(event) {
    if (!this.listeners[event]) {
      throw new Error('Event does not exist');
    }

    return this.listeners[event].length;
  }
};
