'use strict';

class MyEventEmitter {
  constructor() {
    this.eventMap = {};
  }

  on(event, callback) {
    if (!this.eventMap[event]) {
      this.eventMap[event] = [];
    }

    this.eventMap[event].push(callback);

    return this.eventMap;
  }

  once(event, callback) {
    if (!this.eventMap[event]) {
      this.eventMap[event] = [];
    }

    const onceCallback = (...args) => {
      this.off(event, onceCallback);
      callback.apply(this, args);
    };

    this.eventMap[event].push(onceCallback);
  }

  off(event, callback) {
    if (this.eventMap[event]) {
      const callbackArray = this.eventMap[event].filter(
        (func) => func !== callback,
      );

      this.eventMap[event] = callbackArray;
    }
  }

  emit(event, ...args) {
    if (this.eventMap[event] !== undefined) {
      for (const callback of this.eventMap[event]) {
        callback(...args);
      }
    }

    if (event !== '*') {
      this.emit('*', ...args);
    }
  }

  prependListener(event, callback) {
    if (!this.eventMap[event]) {
      this.eventMap[event] = [];
    }

    this.eventMap[event].unshift(callback);

    return this.eventMap;
  }

  prependOnceListener(event, callback) {
    if (!this.eventMap[event]) {
      this.eventMap[event] = [];
    }

    const onceCallback = (...args) => {
      this.off(event, onceCallback);
      callback.apply(this, args);
    };

    this.eventMap[event].unshift(onceCallback);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.eventMap[event];
    } else {
      this.eventMap = {};
    }

    return this.eventMap;
  }

  listenerCount(event) {
    const getEvent = this.eventMap[event];
    const count = getEvent ? getEvent.length : 0;

    return count;
  }
}

module.exports = MyEventEmitter;
