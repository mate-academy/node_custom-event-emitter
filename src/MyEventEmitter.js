'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      listener(...args);
    };

    this.on(eventName, onceWrapper);

    return this;
  }

  off(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.events[eventName]) {
      return this;
    }

    this.events[eventName] = this.events[eventName].filter(
      (l) => l !== listener,
    );

    if (this.events[eventName].length === 0) {
      delete this.events[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return false;
    }

    const toCall = this.events[eventName].slice();

    for (const listener of toCall) {
      listener(...args);
    }

    return true;
  }

  prependListener(eventName, listener) {
    if (typeof listener !== 'function') {

      throw new TypeError('Listener must be a function');
    }

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (typeof listener !== 'function') {

      throw new TypeError('Listener must be a function');
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      listener(...args);
    };

    this.prependListener(eventName, onceWrapper);

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this.events = {};
    } else {
      delete this.events[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = MyEventEmitter;
