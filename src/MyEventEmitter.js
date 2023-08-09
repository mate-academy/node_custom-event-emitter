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
    const newCallback = (...args) => {
      callback(...args);

      this.off(event, newCallback);
    };

    this.on(event, newCallback);

    return this;
  }

  off(event, callback) {
    if (!this.events[event]) {
      throw new Error(`Event ${event} does not exist`);
    }

    this.events[event] = this.events[event].filter((cb) => cb !== callback);

    if (this.events[event].length === 0) {
      delete this.events[event];
    }

    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      throw new Error(`Event ${event} does not exist`);
    }

    this.events[event].forEach((callback) => callback(...args));

    return this;
  }

  prependListener(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(callback);

    return this;
  }

  prependOnceListener(event, callback) {
    const newCallback = (...args) => {
      callback(...args);

      this.off(event, newCallback);
    };

    this.prependListener(event, newCallback);

    return this;
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this.events = {};
    }

    delete this.events[event];

    return this;
  }

  listenerCount(event) {
    if (!this.events[event]) {
      return 0;
    }

    return this.events[event].length;
  }
}

module.exports = { MyEventEmitter };
