'use strict';

class MyEventEmitter {
  #addListener(type, listener, isFirst = false) {
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }

    if (!this._events) {
      this._events = Object.create(null);
    }

    if (!this._events[type]) {
      this._events[type] = [];
    }

    if (isFirst) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }

    return this;
  }
  on(event, listener) {
    this.#addListener(event, listener);
  }
  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    this.#addListener(event, wrapper);
  }
  off(event, listener) {
    if (!this._events || !this._events[event]) {
      return;
    }

    this._events[event] = this._events[event].filter(
      (eventListener) => eventListener !== listener,
    );
  }
  emit(event, ...args) {
    if (!this._events || !this._events[event]) {
      return;
    }

    this._events[event].forEach((callback) => {
      callback(...args);
    });
  }
  prependListener(event, listener) {
    this.#addListener(event, listener, true);
  }
  prependOnceListener(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };

    this.#addListener(event, wrapper, true);
  }
  removeAllListeners(event) {
    if (!this._events || !this._events[event]) {
      return;
    }

    this._events[event] = [];
  }
  listenerCount(event) {
    if (!this._events || !this._events[event]) {
      return 0;
    }

    return this._events[event].length || 0;
  }
}

module.exports = MyEventEmitter;
