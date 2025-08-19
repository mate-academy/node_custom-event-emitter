'use strict';

// Reload AI

class MyEventEmitter {
  constructor(name) {
    this.name = name;
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  once(event, listener) {
    const start = (...arg) => {
      listener(...arg);
      this.off(event, start);
    };

    this.on(event, start);
  }
  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((fn) => fn !== listener);
    }
  }
  emit(event, ...arg) {
    if (this.events[event]) {
      for (const ev of this.events[event]) {
        ev(...arg);
      }
    }
  }
  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    const start = (...arg) => {
      listener(...arg);
      this.off(event, start);
    };

    this.prependListener(event, start);
  }
  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    } else {
      this.events[event] = [];
    }
  }
  listenerCount(event) {
    if (this.events[event]) {
      return this.events[event].length;
    } else {
      return 0;
    }
  }
}

module.exports = MyEventEmitter;
