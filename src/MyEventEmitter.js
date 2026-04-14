'use strict';

class MyEventEmitter {
  constructor() {
    this._events = new Map();
  }

  _getListeners(event) {
    if (!this._events.has(event)) {
      this._events.set(event, []);
    }

    return this._events.get(event);
  }

  on(event, listener) {
    this._getListeners(event).push({
      listener,
      once: false,
    });

    return this;
  }

  once(event, listener) {
    this._getListeners(event).push({
      listener,
      once: true,
    });

    return this;
  }

  off(event, listener) {
    const listeners = this._events.get(event);

    if (!listeners || listeners.length === 0) {
      return this;
    }

    const index = listeners.findIndex((item) => item.listener === listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
      this._events.delete(event);
    }

    return this;
  }

  emit(event, ...args) {
    const listeners = this._events.get(event);

    if (!listeners || listeners.length === 0) {
      return false;
    }

    for (const item of [...listeners]) {
      item.listener(...args);

      if (item.once) {
        this.off(event, item.listener);
      }
    }

    return true;
  }

  prependListener(event, listener) {
    this._getListeners(event).unshift({
      listener,
      once: false,
    });

    return this;
  }

  prependOnceListener(event, listener) {
    this._getListeners(event).unshift({
      listener,
      once: true,
    });

    return this;
  }

  removeAllListeners(event) {
    if (typeof event === 'undefined') {
      this._events.clear();

      return this;
    }

    this._events.delete(event);

    return this;
  }

  listenerCount(event) {
    const listeners = this._events.get(event);

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
