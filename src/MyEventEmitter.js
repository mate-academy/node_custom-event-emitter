'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  once(event, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.events[event] = this.events[event].filter(fn => fn !== onceListener);
    };

    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(onceListener);
  }
  off(event, listener) {
    this.events[event] = this.events[event].filter(fn => fn !== listener);
  }
  emit(event, ...args) {
    this.events[event].forEach(fn => fn(...args));
  }
  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.events[event] = this.events[event].filter(fn => fn !== onceListener);
    };

    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(onceListener);
  }
  removeAllListeners(event) {
    this.events[event] = [];
  }
  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
