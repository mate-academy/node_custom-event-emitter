'use strict';

class MyEventEmitter {
  constructor() {
    this._events = new Map();
  }

  on(eventName, listener) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, []);
    }
    this._events.get(eventName).push({ listener, once: false });

    return this;
  }

  once(eventName, listener) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, []);
    }
    this._events.get(eventName).push({ listener, once: true });

    return this;
  }

  off(eventName, listener) {
    if (!this._events.has(eventName)) {
      return this;
    }

    const listeners = this._events.get(eventName);
    const index = listeners.findIndex((item) => item.listener === listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    return this;
  }

  emit(eventName, ...args) {
    if (!this._events.has(eventName)) {
      return false;
    }

    const listeners = this._events.get(eventName);

    if (listeners.length === 0) {
      return false;
    }

    const listenersCopy = [...listeners];
    const toRemove = new Set();

    for (const item of listenersCopy) {
      item.listener(...args);

      if (item.once) {
        toRemove.add(item);
      }
    }

    for (let i = listeners.length - 1; i >= 0; i--) {
      if (toRemove.has(listeners[i])) {
        listeners.splice(i, 1);
      }
    }

    return true;
  }

  prependListener(eventName, listener) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, []);
    }
    this._events.get(eventName).unshift({ listener, once: false });

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, []);
    }
    this._events.get(eventName).unshift({ listener, once: true });

    return this;
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
    if (!this._events.has(eventName)) {
      return 0;
    }

    return this._events.get(eventName).length;
  }
}

module.exports = MyEventEmitter;
