'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  on(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(listener);
  }

  once(event, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(event, onceListener);
    };

    this.on(event, onceListener);
  }

  off(event, listener) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter((l) => l !== listener);
    }
  }
  emit(event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach((listener) => listener(...args));
    }
  }
  prependListener(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(event, onceListener);
    };

    this.prependListener(event, onceListener);
  }
  removeAllListeners(event) {
    if (event) {
      delete this._events[event];
    } else {
      this._events = {};
    }
  }
  listenerCount(event) {
    return this._events[event] ? this._events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
