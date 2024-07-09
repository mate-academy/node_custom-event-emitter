'use strict';

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    this.createIfNotExists(eventName);
    this.events[eventName].push(callback);
  }

  once(eventName, callback) {
    this.on(eventName, this.createOnce(eventName, callback));
  }

  off(eventName, callback) {
    this.createIfNotExists(eventName);

    this.events[eventName] = this.events[eventName].filter(
      (current) => current !== callback,
    );
  }

  emit(eventName, ...args) {
    this.createIfNotExists(eventName);

    this.events[eventName].forEach((callback) => callback(...args));
  }

  prependListener(eventName, callback) {
    this.createIfNotExists(eventName);

    this.events[eventName].unshift(callback);
  }

  prependOnceListener(eventName, callback) {
    this.prependListener(eventName, this.createOnce(eventName, callback));
  }

  removeAllListeners(eventName) {
    if (eventName) {
      if (this.events.hasOwnProperty(eventName)) {
        delete this.events[eventName];
      }

      return;
    }

    this.events = {};
  }

  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }

  createIfNotExists(eventName) {
    this.events[eventName] = this.events[eventName] || [];
  }

  createOnce(eventName, callback) {
    const onceCall = (...args) => {
      callback(...args);
      this.off(eventName, onceCall);
    };

    return onceCall;
  }
}

module.exports = MyEventEmitter;
