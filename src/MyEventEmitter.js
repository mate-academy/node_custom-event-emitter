'use strict';

class MyEventEmitter {
  _events = {};

  on(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(listener);
  }
  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    wrapper.original = listener;

    this.on(event, wrapper);
  }
  off(event, listener) {
    if (!this._events[event]) {
      return;
    }

    const idx = this._events[event].findIndex(
      (fn) => fn === listener || fn.original === listener,
    );

    if (idx !== -1) {
      this._events[event].splice(idx, 1);
    }
  }
  emit(event, ...args) {
    if (!this._events[event]) {
      return;
    }

    const listeners = [...this._events[event]];

    listeners.forEach((listener) => listener(...args));
  }
  prependListener(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    wrapper.original = listener;

    this.prependListener(event, wrapper);
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
