'use strict';

class MyEventEmitter {
  constructor() {
    this._events = Object.create(null);
  }

  _assertListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
  }

  on(eventName, listener) {
    this._assertListener(listener);

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this._assertListener(listener);

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;

    return this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    this._assertListener(listener);

    const listeners = this._events[eventName];

    if (!listeners || listeners.length === 0) {
      return this;
    }

    const filtered = listeners.filter(
      (fn) => fn !== listener && fn.listener !== listener,
    );

    if (filtered.length === 0) {
      delete this._events[eventName];
    } else {
      this._events[eventName] = filtered;
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this._events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    listeners.slice().forEach((fn) => fn(...args));

    return true;
  }

  prependListener(eventName, listener) {
    this._assertListener(listener);

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this._assertListener(listener);

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    wrapper.listener = listener;

    return this.prependListener(eventName, wrapper);
  }

  removeAllListeners(eventName) {
    if (typeof eventName === 'undefined') {
      this._events = Object.create(null);

      return this;
    }

    delete this._events[eventName];

    return this;
  }

  listenerCount(eventName) {
    const listeners = this._events[eventName];

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
