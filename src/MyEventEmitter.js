'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
  }
  on(eventName, callBack) {
    if (!this._events[eventName]) {
      this._events[eventName] = [callBack];
    } else {
      this._events[eventName].push(callBack);
    }
  }
  once(eventName, callBack) {
    const wrapper = (...args) => {
      callBack(...args);
      this.off(eventName, wrapper);
    };

    this.on(eventName, wrapper);
  }
  off(eventName, callBack) {
    if (!this._events[eventName]) {
      return;
    }
    this._events[eventName] = this._events[eventName].filter((fn) => {
      return fn !== callBack;
    });
  }
  emit(eventName, ...args) {
    if (this._events[eventName]) {
      for (const f of this._events[eventName]) {
        f(...args);
      }
    } else {
    }
  }
  prependListener(eventName, callBack) {
    if (!this._events[eventName]) {
      this._events[eventName] = [callBack];
    } else {
      this._events[eventName].unshift(callBack);
    }
  }
  prependOnceListener(eventName, callBack) {
    const wrapper = (...args) => {
      callBack(...args);
      this.off(eventName, wrapper);
    };

    this.prependListener(eventName, wrapper);
  }
  removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      this._events = {};
    }
  }
  listenerCount(eventName) {
    return (this._events[eventName] || []).length;
  }
}

module.exports = MyEventEmitter;
