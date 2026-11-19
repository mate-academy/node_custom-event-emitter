'use strict';

class MyEventEmitter {
  constructor() {
    this._events = new Map();
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const listeners = this._events.get(eventName) || [];

    listeners.push(listener);
    this._events.set(eventName, listeners);

    return this;
  }

  once(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      listener.apply(this, args);
    };

    onceWrapper._originalListener = listener;

    return this.on(eventName, onceWrapper);
  }

  off(eventName, listener) {
    const listeners = this._events.get(eventName);

    if (!listeners) {
      return this;
    }

    const index = listeners.findIndex(
      (l) => l === listener || l._originalListener === listener,
    );

    if (index !== -1) {
      listeners.splice(index, 1);

      if (listeners.length === 0) {
        this._events.delete(eventName);
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this._events.get(eventName);

    if (!listeners || listeners.length === 0) {
      return false;
    }

    const listenersCopy = [...listeners];

    for (const listener of listenersCopy) {
      listener.apply(this, args);
    }

    return true;
  }

  prependListener(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const listeners = this._events.get(eventName) || [];

    listeners.unshift(listener);
    this._events.set(eventName, listeners);

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      listener.apply(this, args);
    };

    onceWrapper._originalListener = listener;

    return this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this._events.clear();
    } else {
      this._events.delete(eventName);
    }

    return this;
  }

  listenerCount(eventName) {
    const listeners = this._events.get(eventName);

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
