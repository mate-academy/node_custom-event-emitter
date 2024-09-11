'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  _getListeners(eventName) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    return this.events[eventName];
  }

  _createOnceWrapper(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper);
    };

    return wrapper;
  }

  on(eventName, listener) {
    this._getListeners(eventName).push(listener);
  }

  once(eventName, listener) {
    const onceWrapper = this._createOnceWrapper(eventName, listener);

    this.on(eventName, onceWrapper);
  }

  off(eventName, listener) {
    this.events[eventName] = this._getListeners(eventName).filter(
      (l) => l !== listener,
    );
  }

  emit(eventName, ...args) {
    this._getListeners(eventName).forEach((listener) => listener(...args));
  }

  prependListener(eventName, listener) {
    this._getListeners(eventName).unshift(listener);
  }

  prependOnceListener(eventName, listener) {
    const prependOnceWrapper = this._createOnceWrapper(eventName, listener);

    this.prependListener(eventName, prependOnceWrapper);
  }

  removeAllListeners(eventName) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = [];
  }

  listenerCount(eventName) {
    return this._getListeners(eventName).length;
  }
}

module.exports = MyEventEmitter;
