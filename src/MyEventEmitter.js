'use strict';

class MyEventEmitter {
  constructor() {
    this._events = Object.create(null);
  }

  _getListeners(eventName) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    return this._events[eventName];
  }

  _addListener(eventName, listener, { once = false, prepend = false } = {}) {
    const listeners = this._getListeners(eventName);

    const record = {
      listener,
      once,
    };

    if (prepend) {
      listeners.unshift(record);
    } else {
      listeners.push(record);
    }

    return this;
  }

  on(eventName, listener) {
    return this._addListener(eventName, listener, {
      once: false,
      prepend: false,
    });
  }

  once(eventName, listener) {
    return this._addListener(eventName, listener, {
      once: true,
      prepend: false,
    });
  }

  prependListener(eventName, listener) {
    return this._addListener(eventName, listener, {
      once: false,
      prepend: true,
    });
  }

  prependOnceListener(eventName, listener) {
    return this._addListener(eventName, listener, {
      once: true,
      prepend: true,
    });
  }

  off(eventName, listener) {
    const listeners = this._events[eventName];

    if (!listeners || listeners.length === 0) {
      return this;
    }

    const index = listeners.findIndex((rec) => rec.listener === listener);

    if (index !== -1) {
      listeners.splice(index, 1);

      if (listeners.length === 0) {
        delete this._events[eventName];
      }
    }

    return this;
  }

  emit(eventName, ...args) {
    const listeners = this._events[eventName];

    if (!listeners || listeners.length === 0) {
      return false;
    }

    const snapshot = listeners.slice();

    for (const rec of snapshot) {
      rec.listener(...args);

      if (rec.once) {
        const current = this._events[eventName];

        if (!current) {
          continue;
        }

        const idx = current.indexOf(rec);

        if (idx !== -1) {
          current.splice(idx, 1);

          if (current.length === 0) {
            delete this._events[eventName];
          }
        }
      }
    }

    return true;
  }

  removeAllListeners(eventName) {
    if (typeof eventName === 'undefined') {
      this._events = Object.create(null);

      return this;
    }

    delete this._events[eventName];

    return this;
  }

  listenerCount(eventName) {
    const listeners = this._events[eventName];

    return listeners ? listeners.length : 0;
  }
}

module.exports = MyEventEmitter;
