'use strict';

class MyEventEmitter {
  events = {};

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  once(event, callback) {
    const oneTimeListener = (...args) => {
      callback(...args);
      this.off(event, oneTimeListener);
    };

    this.on(event, oneTimeListener);
  }

  off(event, callback) {
    const events = this.events[event];

    if (events) {
      this.events[event] = events.filter((cb) => cb !== callback);
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((cb) => cb(...args));
    }
  }
  prependListener(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].unshift(callback);
  }
  prependOnceListener(event, callback) {
    const oneTimeListener = (...args) => {
      callback(args);
      this.off(event, oneTimeListener);
    };

    this.prependListener(event, oneTimeListener);
  }
  removeAllListeners(event) {
    if (!event) {
      this.events = {};
    } else {
      if (this.events[event]) {
        this.events[event] = [];
      }
    }
  }
  listenerCount(event) {
    if (this.events[event]) {
      return this.events[event].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
