'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  _getEventList(eventName) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    return this._events[eventName];
  }

  on(eventName, listener) {
    const listeners = this._getEventList(eventName);

    listeners.push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };

    wrapper.originalListener = listener;
    this.on(eventName, wrapper);

    return this;
  }

  off(eventName, listener) {
    const listeners = this._events[eventName];

    if (!listeners) {
      return this;
    }

    const index = listeners.findIndex(
      (l) => l === listener || l.originalListener === listener,
    );

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this._events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    [...listeners].forEach((listener) => {
      listener.apply(this, args);
    });

    return true;
  }

  prependListener(eventName, listener) {
    const listeners = this._getEventList(eventName);

    listeners.unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };

    wrapper.originalListener = listener;

    return this.prependListener(eventName, wrapper);
  }

  listenerCount(eventName) {
    if (this._events[eventName]) {
      return this._events[eventName].length;
    }

    return 0;
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      this._events = {};
    }

    return this;
  }
}

module.exports = MyEventEmitter;
