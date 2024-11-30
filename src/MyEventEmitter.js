'use strict';

class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  validateEventName(name) {
    if (typeof name !== 'string') {
      throw new Error('Incorrect event name. Make sure that this is a string');
    }
  }

  validateEventCallback(callback) {
    if (typeof callback !== 'function') {
      throw new Error('It should be a function');
    }
  }

  on(eventName, callback) {
    this.validateEventName(eventName);
    this.validateEventCallback(callback);

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);

    return this;
  }

  once(eventName, callback) {
    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);

      callback(args);
    };

    this.on(eventName, onceWrapper);

    return this;
  }

  off(eventName, callback) {
    this.validateEventName(eventName);
    this.validateEventCallback(callback);

    this.listeners[eventName] = this.listeners[eventName].filter(
      (v) => v !== callback,
    );

    return this;
  }

  emit(eventName, ...args) {
    this.validateEventName(eventName);

    this.listeners[eventName].forEach((callback) => {
      callback(...args);
    });

    return !!this.listeners[eventName];
  }

  prependListener(eventName, callback) {
    this.validateEventName(eventName);
    this.validateEventCallback(callback);

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [callback];
    } else {
      this.off(eventName, callback);

      this.listeners[eventName].unshift(callback);
    }

    return this;
  }

  prependOnceListener(eventName, callback) {
    this.validateEventName(eventName);
    this.validateEventCallback(callback);

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);

      callback(args);
    };

    this.listeners[eventName].unshift(onceWrapper);

    return this;
  }

  removeAllListeners(eventName) {
    if (!this.listeners[eventName]) {
      this.listeners = [];
    } else {
      this.listeners[eventName] = [];
    }

    return this;
  }

  listenerCount(eventName) {
    return this.listeners[eventName]?.length || 0;
  }
}

module.exports = MyEventEmitter;
