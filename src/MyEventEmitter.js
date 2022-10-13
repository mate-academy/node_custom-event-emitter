/* eslint-disable strict */
'use strict';

export class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  addListener(event, fn) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(fn);

    return this;
  }

  on(event, fn) {
    return this.addListener(event, fn);
  }

  once(eventName, fn) {
    this._events[eventName] = this._events[eventName] || [];

    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };

    this._events[eventName].push(onceWrapper);

    return this;
  }

  off(event, fn) {
    return this.removeListener(event, fn);
  }

  emit(eventName, ...args) {
    const fns = this._events[eventName];

    if (!fns) {
      return false;
    }

    fns.forEach((f) => {
      f(...args);
    });

    return true;
  }

  prependListener(name, callback) {
    const onceWrapper = () => {
      callback();
      this.off(name, onceWrapper);
    };

    this._events[name].unshift(onceWrapper);

    return this;
  }

  prependOnceListener(name, callback) {
    this._events[name] = this._events[name] || [];

    this.prependListener(name, callback);

    return this;
  }

  removeAllListeners(name) {
    const listeners = this._events[name];

    if (!listeners) {
      return this;
    }

    listeners.splice(0, listeners.length);

    return this;
  }

  listenerCount(eventName) {
    const fns = this._events[eventName] || [];

    return fns.length;
  }
}
