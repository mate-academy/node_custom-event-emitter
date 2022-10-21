'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, listener) {
    this.addListener(eventName, listener);

    this._checkName(eventName);
    this._checkHandler(listener);

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this._checkName(eventName);
    this._checkHandler(listener);

    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);

    return this;
  }

  off(eventName, listener) {
    this._checkName(eventName);
    this._checkHandler(listener);

    if (!this._events[eventName]) {
      return this;
    }

    this._events[eventName] = this._events[eventName].filter(
      (event) => event !== listener
    );

    return this;
  }

  emit(eventName, ...args) {
    this._checkName(eventName);

    if (!this._events[eventName]) {
      return this;
    }

    this._events[eventName].forEach((event) => event.apply(this, args));

    return this;
  }

  prependListener(eventName, listener) {
    this._checkName(eventName);
    this._checkHandler(listener);

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this._checkName(eventName);
    this._checkHandler(listener);

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(eventName, onceWrapper);
    };

    this._events[eventName].unshift(onceWrapper);
  }

  removeAllListeners(eventName, listeners) {
    this._checkName(eventName);

    if (!this._events[eventName]) {
      return this;
    }

    this._events[eventName] = [];

    return this;
  }

  listenerCount(eventName) {
    this._checkName(eventName);

    if (!this._events[eventName]) {
      return 0;
    }

    return this._events[eventName].length;
  }

  _checkName(eventName) {
    if (!eventName) {
      throw new Error('Event name must be defined!');
    }

    if (typeof eventName !== 'string') {
      throw new Error('Event name must be a string!');
    }
  }

  _checkHandler(handler) {
    if (!handler) {
      throw new Error('Event handler must be defined!');
    }

    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function!');
    }
  }
}

module.exports = { MyEventEmitter };
