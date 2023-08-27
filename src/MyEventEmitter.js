'use strict';

const { isValidEventName } = require('./helperFunctions/isValidEventName');
const { isValidCallback } = require('./helperFunctions/isValidCallback');

class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    isValidEventName(eventName);
    isValidCallback(callback);

    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }

    return this;
  }

  once(eventName, callback) {
    isValidEventName(eventName);
    isValidCallback(callback);

    const oneTimeCallback = (...args) => {
      callback(...args);
      this.off(eventName, callback);
    };

    if (this.events[eventName]) {
      this.events[eventName].push(oneTimeCallback);
    } else {
      this.events[eventName] = [oneTimeCallback];
    }

    return this;
  }

  off(eventName, callback) {
    isValidEventName(eventName);
    isValidCallback(callback);

    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );

    return this;
  }

  emit(eventName, ...args) {
    isValidEventName(eventName);

    if (!this.events[eventName]) {
      return false;
    }

    this.events[eventName].forEach((cb) => {
      cb(...args);
    });

    return true;
  }

  prependListener(eventName, callback) {
    isValidEventName(eventName);
    isValidCallback(callback);

    if (this.events[eventName]) {
      this.events[eventName].unshift(callback);
    } else {
      this.events[eventName] = [callback];
    }

    return this;
  }

  prependOnceListener(eventName, callback) {
    isValidEventName(eventName);
    isValidCallback(callback);

    const oneTimeCallback = (...args) => {
      callback(args);
      this.off(eventName, callback);
    };

    if (this.events[eventName]) {
      this.events[eventName].unshift(oneTimeCallback);
    } else {
      this.events[eventName] = [oneTimeCallback];
    }

    return this;
  }

  removeAllListeners(eventName) {
    isValidEventName(eventName);

    this.events[eventName].length = 0;

    return this;
  }

  listenerCount(eventName) {
    isValidEventName(eventName);

    return this.events[eventName].length || 0;
  }
}

exports.MyEventEmitter = MyEventEmitter;
