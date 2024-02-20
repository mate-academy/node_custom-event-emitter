'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  on(eventName, callback) {
    this._events[eventName] = this._events[eventName] || [];
    this._events[eventName].push(callback);
  }

  once(eventName, callback) {
    const onceWrapper = this._getOnceWrapper(eventName, callback);

    this.on(eventName, onceWrapper);
  }

  off(eventName, callback) {
    const event = this._events[eventName];

    if (event) {
      this._events[eventName] = event.filter(l => l !== callback);
    }
  }

  emit(eventName, ...args) {
    if (this._events[eventName]) {
      this._events[eventName].forEach(listener => listener(...args));
    }
  }

  prependListener(eventName, callback) {
    this._events[eventName] = this._events[eventName] || [];
    this._events[eventName].unshift(callback);
  }

  prependOnceListener(eventName, callback) {
    const onceWrapper = this._getOnceWrapper(eventName, callback);

    this.prependListener(eventName, onceWrapper);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      this._events = [];
    }
  }

  listenerCount(eventName) {
    return (this._events[eventName] || []).length;
  }

  _getOnceWrapper(eventName, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(eventName, onceWrapper);
    };

    return onceWrapper;
  }
}

module.exports = MyEventEmitter;
