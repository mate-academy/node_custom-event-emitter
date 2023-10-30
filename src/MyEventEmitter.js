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
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);
  }
  off(event, listener) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter(fn => fn !== listener);
  }
  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    };
    this.events[event].forEach(fn => fn(...args));
  }
  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.prependListener(event, onceWrapper);
  }
  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
