/* eslint-disable no-console */
'use strict';

class MyEventEmitter {
  constructor() {
    this.events = new Map();
  }
  _onceWrapper(eventName, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };

    return wrapper;
  }
  on(eventName, ...callbacks) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [...callbacks]);
    } else {
      this.events.get(eventName).push(...callbacks);
    }
  }
  once(eventName, cb) {
    this.on(eventName, this._onceWrapper(eventName, cb));
  }
  off(eventName, cb) {
    const listeners = this.events.get(eventName);

    if (listeners) {
      this.events.set(
        eventName,
        listeners.filter((listener) => listener !== cb),
      );
    }
  }
  emit(eventName, ...args) {
    if (this.events.has(eventName)) {
      for (const listener of this.events.get(eventName)) {
        listener(...args);
      }
    }
  }
  prependListener(eventName, callback) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [callback]);
    } else {
      this.events.get(eventName).unshift(callback);
    }
  }
  prependOnceListener(eventName, cb) {
    const prependOnceWrapper = this._onceWrapper(eventName, cb);

    if (this.events.has(eventName)) {
      this.events.get(eventName).unshift(prependOnceWrapper);
    } else {
      this.events.set(eventName, [prependOnceWrapper]);
    }
  }
  removeAllListeners(eventName) {
    if (this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
  }
  listenerCount(eventName) {
    if (this.events.has(eventName)) {
      return this.events.get(eventName).length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
