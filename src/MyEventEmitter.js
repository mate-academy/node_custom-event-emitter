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
    const newCallback = (args) => {
      callback(args);
      this.off(event, newCallback);
    };

    this.on(event, newCallback);

    return this;
  }

  off(event, callback) {
    if (!this.events[event]) {
      return this;
    }

    this.events[event].filter(func => func !== callback);

    return this;
  }

  emit(event, ...args) {
    this.events[event].forEach(callback => callback(args));

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
    const newCallback = (args) => {
      callback(args);
      this.off(event, newCallback);
    };

    this.prependListener(event, newCallback);

    return this;
  }

  removeAllListeners(event) {
    if (this.events[event]) {
      this.events[event] = null;
    }
  }

  listenerCount(event) {
    if (this.events[event]) {
      return this.events[event].length;
    }

    return 0;
  }
}

module.exports = {
  MyEventEmitter,
};
