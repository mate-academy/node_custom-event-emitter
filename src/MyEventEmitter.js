'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const listeners = this._events[eventName];

    if (listeners) {
      listeners.push(listener);
    } else {
      this._events[eventName] = [listener];
    }
  }

  once(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    this.on(eventName, wrapper);
  }

  off(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    this._events[eventName] = this._events[eventName].filter(
      (e) => e !== listener && e.originalListener !== listener,
    );
  }

  emit(eventName, ...args) {
    if (typeof eventName !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    const listeners = this._events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    for (const listener of listeners) {
      listener(...args);
    }
  }

  prependListener(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this._events[eventName]) {
      this._events[eventName] = [listener];
    } else {
      this._events[eventName].unshift(listener);
    }
  }

  prependOnceListener(eventName, listener) {
    if (typeof eventName !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener(...args);
    };

    if (this._events[eventName]) {
      this._events[eventName].unshift(wrapper);
    } else {
      this._events[eventName] = [wrapper];
    }
  }

  removeAllListeners(eventName) {
    if (typeof eventName !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    if (this._events[eventName]) {
      delete this._events[eventName];
    } else {
      throw new Error('No listeners for event');
    }
  }

  listenerCount(eventName) {
    if (typeof eventName !== 'string') {
      throw new TypeError('Event name must be a string');
    }

    return this._events[eventName] ? this._events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
