'use strict';

class MyEventEmitter {
  constructor() {
    this._listeners = {};
  }

  on(eventName, fn) {
    this._checkEventName(eventName);
    this._checkEventListener(fn);

    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    this._listeners[eventName].push(fn);

    return this;
  }

  once(eventName, fn) {
    this._checkEventName(eventName);
    this._checkEventListener(fn);

    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    const onceWrapper = (...params) => {
      fn(...params);
      this.off(eventName, onceWrapper);
    };

    this._listeners[eventName].push(onceWrapper);

    return this;
  }

  off(eventName, fn) {
    this._checkEventName(eventName);
    this._checkEventListener(fn);

    if (!this._listeners[eventName]) {
      return this;
    }

    this._listeners[eventName] = this._listeners[eventName].filter(listener => (
      listener !== fn
    ));

    if (!this._listeners[eventName].length) {
      delete this._listeners[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    this._checkEventName(eventName);

    const fns = this._listeners[eventName];

    if (!fns) {
      return false;
    }

    fns.forEach(fn => {
      fn(...args);
    });

    return true;
  }

  prependListener(eventName, fn) {
    this._checkEventName(eventName);
    this._checkEventListener(fn);

    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    this._listeners[eventName].unshift(fn);

    return this;
  }

  prependOnceListener(eventName, fn) {
    this._checkEventName(eventName);
    this._checkEventListener(fn);

    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    const onceWrapper = (...params) => {
      fn(...params);
      this.off(eventName, onceWrapper);
    };

    this._listeners[eventName].unshift(onceWrapper);

    return this;
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this._listeners = {};

      return this;
    }

    this._checkEventName(eventName);

    if (!this._listeners[eventName]) {
      return this;
    }

    delete this._listeners[eventName];

    return this;
  }

  listenerCount(eventName) {
    this._checkEventName(eventName);

    const fns = this._listeners[eventName] || [];

    return fns.length;
  }

  _checkEventName(eventName) {
    if (!eventName) {
      throw new Error('Event name must be defined!');
    }

    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string!');
    }
  }

  _checkEventListener(listener) {
    if (!listener) {
      throw new Error('Event handler must be defined!');
    }

    if (typeof listener !== 'function') {
      throw new Error('Event handler must be a function!');
    }
  }
}

module.exports = { MyEventEmitter };
