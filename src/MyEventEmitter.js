'use strict';

class MyEventEmitter {
  events = {};

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({ fn: listener, once: false });
  }

  once(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({ fn: listener, once: true });
  }

  off(eventName, listener) {
    const listeners = this.events[eventName];

    if (!listeners) {
      return;
    }

    const idx = listeners.findIndex((obj) => obj.fn === listener);

    if (idx !== -1) {
      listeners.splice(idx, 1);
    }

    if (listeners.length === 0) {
      delete this.events[eventName];
    }
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    const listenersCopy = this.events[eventName].slice();

    for (const obj of listenersCopy) {
      if (!this.events[eventName]) {
        break;
      }

      // if (obj && typeof obj.fn === 'function') {
      //   obj.fn(...args);
      // }

      obj.fn(...args);

      if (obj.once) {
        const currListeners = this.events[eventName];

        if (!currListeners) {
          break;
        }

        const idx = currListeners.indexOf(obj);

        if (idx !== -1) {
          currListeners.splice(idx, 1);
        }

        if (currListeners.length === 0) {
          delete this.events[eventName];
        }
      }
    }
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({ fn: listener, once: false });
  }

  prependOnceListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift({ fn: listener, once: true });
  }

  removeAllListeners(eventName) {
    if (eventName !== undefined) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
