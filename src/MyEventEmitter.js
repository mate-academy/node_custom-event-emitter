'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);

    return this;
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);

    return this;
  }

  off(event, listener) {
    if (!this.events[event]) {
      return this;
    }

    this.events[event] = this.events[event].filter((l) => l !== listener);

    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    this.events[event].forEach((listener) => {
      listener.apply(this, args);
    });

    return true;
  }

  prependListener(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(listener);

    return this;
  }

  prependOnceListener(event, listener) {
    const onceWrapper = (...args) => {
      listener(args);
      this.off(event, onceWrapper);
    };

    this.prependListener(event, onceWrapper);

    return this;
  }

  removeAllListeners(event) {
    this.events[event] = [];

    return this;
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    } else {
      return this.events[event].length;
    }
  }
}

module.exports = MyEventEmitter;
