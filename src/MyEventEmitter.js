'use strict';

class MyEventEmitter {
  constructor() {
    this._events = Object.create(null);
  }

  listenerCount(eventName) {
    const list = this._events[eventName];

    return Array.isArray(list) ? list.length : 0;
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    const list = this._events[eventName] || (this._events[eventName] = []);

    list.push({ fn: listener, once: false });

    return this;
  }

  once(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    const list = this._events[eventName] || (this._events[eventName] = []);

    list.push({ fn: listener, once: true });

    return this;
  }

  prependListener(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    const list = this._events[eventName] || (this._events[eventName] = []);

    list.unshift({ fn: listener, once: false });

    return this;
  }

  prependOnceListener(eventName, listener) {
    if (typeof listener !== 'function') {
      return this;
    }

    const list = this._events[eventName] || (this._events[eventName] = []);

    list.unshift({ fn: listener, once: true });

    return this;
  }

  off(eventName, listener) {
    const list = this._events[eventName];

    if (!Array.isArray(list) || typeof listener !== 'function') {
      return this;
    }

    for (let i = list.length - 1; i >= 0; i -= 1) {
      if (list[i].fn === listener) {
        list.splice(i, 1);
      }
    }

    if (list.length === 0) {
      delete this._events[eventName];
    }

    return this;
  }

  removeAllListeners(eventName) {
    if (typeof eventName === 'undefined') {
      this._events = Object.create(null);

      return this;
    }

    if (eventName in this._events) {
      delete this._events[eventName];
    }

    return this;
  }

  emit(eventName, ...args) {
    const list = this._events[eventName];

    if (!Array.isArray(list) || list.length === 0) {
      return false;
    }

    const snapshot = list.slice(); // manter ordem e permitir remoção de once

    for (const entry of snapshot) {
      try {
        entry.fn(...args);
      } finally {
        if (entry.once) {
          const index = list.indexOf(entry);

          if (index !== -1) {
            list.splice(index, 1);
          }
        }
      }
    }

    if (list.length === 0) {
      delete this._events[eventName];
    }

    return true;
  }
}

module.exports = MyEventEmitter;
