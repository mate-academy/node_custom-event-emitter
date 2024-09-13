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

    return this;
  }

  once(event, listener) {
    const one = (...args) => {
      listener(...args);
      this.off(event, one);
    };

    this.on(event, one);

    return this;
  }

  off(event, listener) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((lis) => lis !== listener);
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

    return this;
  }

  prependOnceListener(event, listener) {
    const one = (...args) => {
      listener(...args);
      this.off(event, one);
    };

    this.prependListener(event, one);

    return this;
  }

  removeAllListeners(event) {
    delete this.events[event];
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }
}

module.exports = MyEventEmitter;
