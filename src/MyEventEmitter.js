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
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.on(eventName, wrapper);
  }
  off(eventName, listenerToRemove) {
    if (!this.events[eventName]) {
      return;
    }
    // eslint-disable-next-line max-len
    this.events[eventName] = this.events[eventName].filter(listener => listener !== listenerToRemove);
  }
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach(listener => listener(...args));
  }
  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(listener);
  }
  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    delete this.events[eventName];
  }
  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = { MyEventEmitter };
