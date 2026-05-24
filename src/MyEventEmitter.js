'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  createWrappedListener = (event, listener) => {
    const wrappedListener = (...args) => {
      this.off(event, wrappedListener);
      listener(...args);
    };

    return wrappedListener;
  };
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }
  once(event, listener) {
    const wrappedListener = this.createWrappedListener(event, listener);

    this.on(event, wrappedListener);
  }
  off(event, listener) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter(
      (eventListener) => eventListener !== listener,
    );
  }
  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach((listener) => listener(...args));
  }
  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    const wrappedListener = this.createWrappedListener(event, listener);

    this.prependListener(event, wrappedListener);
  }
  removeAllListeners(event) {
    if (event === undefined) {
      this.events = {};

      return;
    }

    delete this.events[event];
  }
  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
