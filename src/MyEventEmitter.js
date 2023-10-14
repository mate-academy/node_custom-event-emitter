'use strict';

class MyEventEmitter {
  constructor() {
    this._events = {};
    this._eventsCount = 0;
  }

  on(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
      this._eventsCount++;
    }
    this._events[event].push(listener);

    return this;
  }

  once(event, listener) {
    const wrappedListener = (...args) => {
      listener(...args);
      this.off(event, wrappedListener);
    };

    this.on(event, wrappedListener);

    return this;
  }

  off(event, listener) {
    if (!this._events[event]) {
      return this;
    }
    this._events[event] = this._events[event].filter(l => l !== listener);

    if (!this._events[event].length) {
      delete this._events[event];
      this._eventsCount--;
    }

    return this;
  }

  emit(event, ...args) {
    if (!this._events[event]) {
      return false;
    }
    this._events[event].forEach(listener => listener(...args));

    return true;
  }

  prependListener(event, listener) {
    if (!this._events[event]) {
      this._events[event] = [];
      this._eventsCount++;
    }
    this._events[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    const wrappedListener = (...args) => {
      listener(...args);
      this.off(event, wrappedListener);
    };

    this.prependListener(event, wrappedListener);

    return this;
  }

  removeAllListeners(event) {
    if (event) {
      if (this._events[event]) {
        delete this._events[event];
        this._eventsCount--;
      }
    } else {
      this._events = {};
      this._eventsCount = 0;
    }

    return this;
  }

  listenerCount(event, listener) {
    if (listener) {
      return this._events[event]
        ? (
          this
            ._events[event]
            .filter(appliedListeners => appliedListeners === listener)
            .length
        ) : 0;
    }

    return this._events[event] ? this._events[event].length : 0;
  }
}

module.exports = {
  MyEventEmitter,
};
