'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    this.events[eventName]
      ? this.events[eventName].push(callback)
      : this.events[eventName] = [callback];

    return this;
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName]
        .filter(cb => cb !== callback);
    }

    return this;
  }

  once(eventName, callback) {
    const firstCall = (...args) => {
      callback(...args);
      this.off(eventName, firstCall);
    };

    this.on(eventName, firstCall);

    return this;
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(cb => cb(...args));
    }

    return this;
  }

  prependListener(eventName, callback) {
    this.events[eventName]
      ? this.events[eventName].unshift(callback)
      : this.events[eventName] = [callback];

    return this;
  }

  prependOnceListener(eventName, callback) {
    const firstCall = (...args) => {
      callback(...args);
      this.off(eventName, firstCall);
    };

    this.events[eventName].unshift(firstCall);

    return this;
  }

  removeAllListeners(eventName) {
    eventName
      ? delete this.events[eventName] : this.events = {};

    return this;
  }

  listenerCount(eventName) {
    return this.events[eventName].length || 0;
  }
}

module.exports = { MyEventEmitter };
