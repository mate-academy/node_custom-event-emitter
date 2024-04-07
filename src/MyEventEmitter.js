'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }
  on(eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);

    return this;
  }
  once(eventName, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(eventName, onceCallback);
    };

    this.on(eventName, onceCallback);

    return this;
  }
  off(eventName, callback) {
    if (!this._events[eventName]) {
      return this;
    }

    this._events[eventName] = this._events[eventName].filter(
      (f) => f !== callback,
    );

    return this;
  }
  emit(eventName, ...args) {
    if (!this._events[eventName]) {
      return false;
    }

    this._events[eventName].forEach((element) => {
      element(...args);
    });

    return true;
  }
  prependListener(eventName, callback) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].unshift(callback);

    return this;
  }
  prependOnceListener(eventName, callback) {
    const onceCallback = (...args) => {
      this.off(eventName, onceCallback);
      callback(...args);
    };

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].unshift(onceCallback);

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
    if (!this._events[eventName]) {
      return 0;
    }

    return this._events[eventName].length;
  }
}

module.exports = MyEventEmitter;
