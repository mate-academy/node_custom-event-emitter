/* eslint-disable no-console */
'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((lis) => lis !== listener);
    }
  }
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => {
        listener(...args);
      });
    }
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);
  }
  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };

    this.prependListener(event, onceWrapper);
  }

  removeAllListeners(event) {
    this.events[event] = [];
  }

  listenerCount(event, listener) {
    if (this.events[event]) {
      if (listener) {
        return this.events[event].filter((lis) => lis === listener).length;
      }

      return this.events[event].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
