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
    const onceListener = (...args) => {
      listener(...args);
      this.off(event, onceListener);
    };

    this.on(event, onceListener);
  }

  off(event, listenerToRemove) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        (listener) => listener !== listenerToRemove,
      );
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }
  }

  prependListener(event, listener) {
    if (this.events[event]) {
      this.events[event].unshift(listener);
    }
  }

  prependOnceListener(event, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(event, onceListener);
    };

    this.prependListener(event, onceListener);
  }

  removeAllListeners(event) {
    if (!event) {
      return (this.events = {});
    }

    if (this.events[event]) {
      this.events[event] = [];
    }
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }
}

module.exports = MyEventEmitter;
