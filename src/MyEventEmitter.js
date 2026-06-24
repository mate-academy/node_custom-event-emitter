'use strict';

class MyEventEmitter {
  events = {};
  on(event, callback) {
    if (Object.hasOwn(this.events, event)) {
      this.events[event].push(callback);

      return;
    }

    this.events[event] = [];
    this.events[event].push(callback);
  }

  once(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(event, onceCallback);
    };

    if (Object.hasOwn(this.events, event)) {
      this.events[event].push(onceCallback);

      return;
    }

    this.events[event] = [];
    this.events[event].push(onceCallback);
  }

  off(event, callback) {
    if (!Object.hasOwn(this.events, event)) {
      return;
    }

    if (!this.events[event].find((item) => item === callback)) {
      return;
    }

    this.events[event] = this.events[event].filter((item) => item !== callback);

    if (this.events[event].length === 0) {
      delete this.events[event];
    }
  }

  emit(event, ...args) {
    if (event in this.events) {
      this.events[event].forEach((callback) => callback(...args));

      return true;
    }

    return false;
  }

  prependListener(event, callback) {
    if (Object.hasOwn(this.events, event)) {
      this.events[event].unshift(callback);

      return;
    }

    this.events[event] = [];
    this.events[event].unshift(callback);
  }

  prependOnceListener(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(event, onceCallback);
    };

    if (Object.hasOwn(this.events, event)) {
      this.events[event].unshift(onceCallback);

      return;
    }

    this.events[event] = [];
    this.events[event].unshift(onceCallback);
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this.events = {};

      return;
    }

    if (Object.hasOwn(this.events, event)) {
      delete this.events[event];
    }
  }

  listenerCount(event) {
    if (Object.hasOwn(this.events, event)) {
      return this.events[event].length;
    }

    return 0;
  }
}

module.exports = MyEventEmitter;
