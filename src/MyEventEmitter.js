'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  _getListeners(event) {
    return this._events[event] || (this._events[event] = []);
  }

  on(event, listener) {
    this._getListeners(event).push({ fn: listener, once: false });

    return this;
  }

  once(event, listener) {
    this._getListeners(event).push({ fn: listener, once: true });

    return this;
  }

  off(event, listener) {
    const listeners = this._events[event];

    if (!listeners) {
      return this;
    }

    const index = listeners.findIndex((l) => l.fn === listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = this._events[event];

    if (!listeners) {
      return false;
    }

    for (const listener of [...listeners]) {
      if (listener.once) {
        this.off(event, listener.fn);
      }
      listener.fn(...args);
    }

    return true;
  }

  prependListener(event, listener) {
    this._getListeners(event).unshift({ fn: listener, once: false });

    return this;
  }

  prependOnceListener(event, listener) {
    this._getListeners(event).unshift({ fn: listener, once: true });

    return this;
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this._events = {};
    } else {
      delete this._events[event];
    }

    return this;
  }

  listenerCount(event) {
    return (this._events[event] || []).length;
  }
}

module.exports = MyEventEmitter;
