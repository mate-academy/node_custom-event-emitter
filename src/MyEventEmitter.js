'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    return this;
  }
  once(eventName, callback) {
    const newCallback = (...args) => {
      callback(...args);

      this.off(eventName, newCallback);
    };

    this.on(eventName, newCallback);

    return this;
  }
  off(eventName, callback) {
    if (!this.events[eventName]) {
      throw new Error(`${eventName} does not exist`);
    }

    this.events[eventName] = this.events[eventName]
      .filter(cb => cb !== callback);

    if (!this.events[eventName].length) {
      delete this.events[eventName];
    }

    return this;
  }
  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      throw new Error(`${eventName} does not exist`);
    }

    this.events[eventName].forEach(cb => cb(...args));

    return this;
  }
  prependListener(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].unshift(callback);

    return this;
  }
  prependOnceListener(eventName, callback) {
    const newCallback = (...args) => {
      callback(...args);

      this.off(eventName, newCallback);
    };

    this.prependListener(eventName, newCallback);

    return this;
  }
  removeAllListeners(eventName) {
    if (eventName === undefined) {
      this.events = {};
    }

    delete this.events[eventName];

    return this;
  }
  listenerCount(eventName) {
    if (!this.events[eventName]) {
      return 0;
    }

    return this.events[eventName].length;
  }
}

module.exports = { MyEventEmitter };
