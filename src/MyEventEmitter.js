'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    wrapper.original = listener;
    this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    if (this.events[eventName]) {
      const listeners = this.events[eventName];

      const index = listeners.findIndex(
        (fn) => fn === listener || fn.original === listener,
      );

      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      const listeners = this.events[eventName].slice();

      listeners.forEach((listener) => listener(...args));
    }
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    wrapper.original = listener;

    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(wrapper);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      Object.keys(this.events).forEach((key) => delete this.events[key]);
    }
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
