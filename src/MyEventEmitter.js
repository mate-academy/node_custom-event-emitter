'use strict';
class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };

    this.on(eventName, wrapper);

    return this;
  }

  off(eventName, listener) {
    const listeners = this._events[eventName];

    if (!listeners) {
      return this;
    }

    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this._events[eventName];

    if (!listeners) {
      return false;
    }

    const listenersCopy = [...listeners];

    listenersCopy.forEach((listener) => {
      listener.apply(this, args);
    });

    return true;
  }

  prependListener(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };

    this.prependListener(eventName, wrapper);

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName) {
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
