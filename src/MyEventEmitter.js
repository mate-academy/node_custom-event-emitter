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
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);

      this.off(event, wrapper);
    };

    return this.on(event, wrapper);
  }

  off(event, callback) {
    if (!this.events[event]) {
      return this;
    }

    this.events[event] = this.events[event].filter((cl) => cl !== callback);

    return this;
  }
  emit(event, ...args) {
    if (!this.events[event]) {
      return false;
    }

    this.events[event].forEach((callback) => {
      callback(...args);
    });

    return true;
  }
  prependListener(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].unshift(callback);

    return this;
  }

  prependOnceListener(event, callback) {
    const wrapper = (...args) => {
      callback(...args);

      this.off(event, wrapper);
    };

    return this.prependListener(event, wrapper);
  }

  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    }

    if (!this.events[event]) {
      return this;
    }

    this.events[event] = [];

    return this;
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }
}

module.exports = MyEventEmitter;
