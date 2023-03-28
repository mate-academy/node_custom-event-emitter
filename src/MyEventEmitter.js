'use strict';

class MyEventEmitter {
  constructor() {
    this._listeners = {};
  }

  _validateEventName(eventName) {
    if (!eventName) {
      throw new Error('The event name must be passed');
    }

    if (typeof eventName !== 'string' || typeof eventName !== 'symbol') {
      throw new Error('Invalid event name type');
    }
  }

  _validateListener(listener) {
    if (!listener) {
      throw new Error('The listener must be passed');
    }

    if (typeof listener !== 'function') {
      throw new Error('Invalid listener type');
    }
  }

  _checkPropertyExist(eventName) {
    if (!this._listeners.hasOwnProperty(eventName)) {
      this._listeners[eventName] = [];
    }
  }

  _useCallback(eventName, listener) {
    const callback = (...args) => {
      listener(args);
      this.off(eventName, callback);
    };

    return callback;
  }

  on(eventName, listener) {
    this._validateEventName(eventName);
    this._validateListener(listener);
    this._checkPropertyExist(eventName);
    this._listeners[eventName].push(listener);

    return this;
  }

  once(eventName, listener) {
    this._validateEventName(eventName);
    this._validateListener(listener);

    const onceCallback = this._useCallback(eventName, listener);

    this.on(eventName, onceCallback);
  }

  off(eventName, listenerToRemove) {
    this._validateEventName(eventName);
    this._validateListener(listenerToRemove);

    if (this._listeners.hasOwnProperty(eventName)) {
      this._listeners[eventName] = this._listeners[eventName]
        .filter(listener => listener !== listenerToRemove);
    }

    return this;
  }

  emit(eventName, ...args) {
    this._validateEventName(eventName);

    if (this._listeners.hasOwnProperty(eventName)) {
      this._listeners[eventName].forEach(listener => listener(args));
    }

    return this;
  }

  prependListener(eventName, listener) {
    this._validateEventName(eventName);
    this._validateListener(listener);
    this._checkPropertyExist(eventName);
    this._listeners[eventName].unshift(listener);

    return this;
  }

  prependOnceListener(eventName, listener) {
    this._validateEventName(eventName);
    this._validateListener(listener);

    const onceCallback = this._useCallback(eventName, listener);

    this.prependListener(eventName, onceCallback);
  }

  removeAllListeners(eventName) {
    if (!eventName) {
      this._listeners = {};

      return this;
    }

    if (this._listeners.hasOwnProperty(eventName)) {
      delete this._listeners[eventName];
    }

    return this;
  }

  listenerCount(eventName) {
    this._validateEventName(eventName);

    return this._listeners[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
