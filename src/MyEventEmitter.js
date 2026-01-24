'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener is not a function');
    }

    if (!Object.hasOwn(this.events, eventName)) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);

    return this;
  }
  once(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener is not a function');
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.on(eventName, wrapper);

    return this;
  }
  off(eventName, listener) {
    if (!this.events[eventName]) {
      return this;
    }

    const listeners = this.events[eventName];
    let result = [];

    result = listeners.filter((fn) => fn !== listener);

    if (result.length === 0) {
      delete this.events[eventName];
    } else {
      this.events[eventName] = result;
    }

    return this;
  }
  emit(eventName, ...args) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return false;
    }

    [...listeners].forEach((listener) => listener(...args));

    return true;
  }
  prependListener(eventName, listener) {
    let listeners = this.events[eventName];

    if (typeof listener !== 'function') {
      throw new Error('Listener is not a function');
    }

    if (!Object.hasOwn(this.events, eventName)) {
      listeners = [];
    }

    this.events[eventName] = listeners;
    listeners.unshift(listener);

    return this;
  }
  prependOnceListener(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new Error('Listener is not a function');
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.prependListener(eventName, wrapper);

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }

    return this;
  }
  listenerCount(eventName) {
    if (this.events[eventName]) {
      return this.events[eventName].length;
    } else {
      return 0;
    }
  }
}
module.exports = MyEventEmitter;
