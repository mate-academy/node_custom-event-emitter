'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  _getListeners(eventName) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    return this._events[eventName];
  }

  on(eventName, listener) {
    this._getListeners(eventName).push({ listener, once: false });

    return this;
  }

  once(eventName, listener) {
    this._getListeners(eventName).push({ listener, once: true });

    return this;
  }

  off(eventName, listener) {
    if (!this._events[eventName]) {
      return this;
    }

    const idx = this._events[eventName].findIndex(
      (entry) => entry.listener === listener,
    );

    if (idx !== -1) {
      this._events[eventName].splice(idx, 1);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this._events[eventName]) {
      return false;
    }

    const entries = [...this._events[eventName]];

    for (const entry of entries) {
      if (entry.once) {
        this.off(eventName, entry.listener);
      }

      entry.listener(...args);
    }

    return true;
  }

  prependListener(eventName, listener) {
    this._getListeners(eventName).unshift({ listener, once: false });

    return this;
  }

  prependOnceListener(eventName, listener) {
    this._getListeners(eventName).unshift({ listener, once: true });

    return this;
  }

  removeAllListeners(eventName) {
    if (eventName !== undefined) {
      delete this._events[eventName];
    } else {
      this._events = {};
    }

    return this;
  }

  listenerCount(eventName) {
    return this._events[eventName] ? this._events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
